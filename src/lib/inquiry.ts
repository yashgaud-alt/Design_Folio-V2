import { createServerFn } from "@tanstack/react-start";
import { profile } from "@/lib/site";

export type Inquiry = {
  name: string;
  email: string;
  intent: string;
  message: string;
  honey?: string;
};

const intentLabel: Record<string, string> = {
  project: "A project",
  collaboration: "A collaboration",
  other: "Something else",
};

function validate(data: Inquiry): Inquiry {
  const name = data.name.trim();
  const email = data.email.trim();
  const intent = data.intent.trim();
  const message = data.message.trim();
  const honey = (data.honey ?? "").trim();

  if (name.length < 2) throw new Error("A name, even a short one.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("That email does not look usable.");
  }
  if (message.length < 12) {
    throw new Error("A little more on the work would help.");
  }

  return { name, email, intent, message, honey };
}

async function deliver(data: Inquiry) {
  if (data.honey) return { ok: true as const };

  const about = intentLabel[data.intent] ?? data.intent;
  const { getRequestHeader } = await import("@tanstack/react-start/server");
  const origin =
    getRequestHeader("origin") ??
    getRequestHeader("referer") ??
    "https://yashgaud.xyz";

  const response = await fetch(
    `https://formsubmit.co/ajax/${profile.email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin.endsWith("/") ? origin : `${origin}/`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        intent: about,
        message: data.message,
        _replyto: data.email,
        _subject: `Folio — ${about} from ${data.name}`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const payload = (await response.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;

  const failed =
    !response.ok ||
    payload?.success === false ||
    payload?.success === "false";

  if (failed) {
    throw new Error("Could not send just now. Use Mail in the footer.");
  }

  return { ok: true as const };
}

export const sendInquiry = createServerFn({ method: "POST" })
  .validator((data: Inquiry) => validate(data))
  .handler(async ({ data }) => deliver(data));
