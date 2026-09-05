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

function aboutOf(intent: string) {
  return intentLabel[intent] ?? intent;
}

function payloadOf(data: Inquiry) {
  const about = aboutOf(data.intent);
  return {
    name: data.name,
    email: data.email,
    intent: about,
    message: data.message,
    _replyto: data.email,
    _subject: `Folio — ${about} from ${data.name}`,
    _template: "table",
    _captcha: "false",
  };
}

function isSuccess(payload: { success?: boolean | string } | null) {
  if (!payload) return false;
  return payload.success === true || payload.success === "true";
}

async function sendAjax(data: Inquiry) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${profile.email}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payloadOf(data)),
    },
  );
  const payload = (await response.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;
  if (!isSuccess(payload)) {
    throw new Error(payload?.message || "ajax failed");
  }
}

function sendByMailApp(data: Inquiry) {
  const about = aboutOf(data.intent);
  const subject = encodeURIComponent(`Folio — ${about} from ${data.name}`);
  const body = encodeURIComponent(
    `${data.message}\n\n— ${data.name}\n${data.email}`,
  );
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

async function sendFormData(data: Inquiry) {
  const body = new FormData();
  for (const [key, value] of Object.entries(payloadOf(data))) {
    body.append(key, value);
  }
  const response = await fetch(
    `https://formsubmit.co/ajax/${profile.email}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    },
  );
  const payload = (await response.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;
  if (!isSuccess(payload)) {
    throw new Error(payload?.message || "formdata failed");
  }
}

export async function sendInquiry(data: Inquiry) {
  if (data.honey) return;

  try {
    await sendAjax(data);
    return;
  } catch {
    try {
      await sendFormData(data);
      return;
    } catch {
      sendByMailApp(data);
    }
  }
}
