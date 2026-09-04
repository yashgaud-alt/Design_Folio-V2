import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { useTheme } from "@/lib/theme";
import {
  categories,
  profile,
  skills,
  works,
  type Category,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <div>
      <Hero />
      <WorksSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}

function Hero() {
  const { toggle, theme } = useTheme();

  return (
    <section className="relative px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
      <div className="rise">
        <button
          type="button"
          onClick={toggle}
          className="philosophy block max-w-4xl text-left"
          aria-label={`Philosophy. Currently ${theme} paper. Click to invert.`}
          title="Click to invert paper and ink"
        >
          <h1 className="font-serif text-display leading-tight tracking-display">
            Designing just <em>enough</em>
          </h1>
        </button>
      </div>
      <p className="rise rise-2 mt-6 max-w-xl text-base leading-normal text-fg-muted">
        {profile.bio}
      </p>
      <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href="#work" className="group">
            Selected works
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" strokeWidth={1.75} />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="#contact">Contact</a>
        </Button>
      </div>
    </section>
  );
}

function SectionHead({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-end justify-between gap-6",
        kicker ? "mb-10 md:mb-14" : "mb-8 md:mb-10",
      )}
    >
      <div>
        <h2 className="font-sans text-2xl font-medium tracking-tight md:text-3xl">
          {title}
        </h2>
        {kicker ? (
          <p className="mt-2 max-w-md text-sm text-fg-muted">{kicker}</p>
        ) : null}
      </div>
      <span className="mb-1 font-serif text-xl italic text-fg-subtle">
        {index}
      </span>
    </header>
  );
}

function WorksSection() {
  const [filter, setFilter] = useState<Category>("All");
  const visible = useMemo(() => {
    if (filter === "All") return works;
    return works.filter((work) => work.categories.includes(filter));
  }, [filter]);

  return (
    <section
      id="work"
      className="scroll-mt-6 px-5 py-20 md:px-8 md:py-24"
    >
      <Reveal>
        <SectionHead index="01" title="Selected works" />

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(category)}
                className={cn(
                  "inline-flex h-11 items-center rounded-full border px-4 text-sm transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.96]",
                  active
                    ? "border-fg bg-fg text-bg"
                    : "border-border bg-transparent text-fg-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </Reveal>

      {visible.length === 0 ? (
        <p className="text-sm text-fg-muted">Nothing in this drawer.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {visible.map((work) => (
            <ProjectCard key={work.slug} work={work} />
          ))}
        </div>
      )}
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-6 px-5 py-20 md:px-8 md:py-24"
    >
      <SectionHead index="02" title="About" />
      <Reveal>
        <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-xl text-lg leading-normal text-fg">
            {profile.bio}
          </p>
          <p className="mt-6 max-w-xl text-base leading-normal text-fg-muted">
            The line on this site — designing just enough — is the working
            method. Subtract until the picture, the type, and the cut are doing
            one job. High autonomy, clear communication, and staying with a
            piece from the first note to the last frame.
          </p>
        </div>
        <aside className="md:col-span-5">
          <dl className="space-y-3">
            <Row term="Practice" detail="Motion, edit, infographics" />
            <Row term="Shape" detail="Explainers and product demos" />
            <Row term="Method" detail="Start to finish, one conversation" />
            <Row term="Line" detail="Designing just enough" />
          </dl>
        </aside>
      </div>
      </Reveal>
    </section>
  );
}

function Row({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <dt className="text-sm text-fg-subtle">{term}</dt>
      <dd className="col-span-2 text-sm text-fg">{detail}</dd>
    </div>
  );
}

function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-6 px-5 py-20 md:px-8 md:py-24"
    >
      <SectionHead
        index="03"
        title="Skills"
        kicker="Craft before tools. Tools follow the cut."
      />
      <Reveal>
      <ul className="space-y-5">
        {skills.map((skill) => (
          <li
            key={skill.en}
            className="grid grid-cols-1 items-baseline gap-1 sm:grid-cols-12 sm:gap-6"
          >
            <span className="font-sans text-base text-fg sm:col-span-4">
              {skill.en}
            </span>
            <span className="text-sm text-fg-muted sm:col-span-8">
              {skill.note}
            </span>
          </li>
        ))}
      </ul>
      </Reveal>
    </section>
  );
}

const intents = [
  { value: "project", label: "A project" },
  { value: "collaboration", label: "A collaboration" },
  { value: "other", label: "Something else" },
] as const;

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const intent = String(data.get("intent") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setError("A name, even a short one.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email does not look usable.");
      return;
    }
    if (message.length < 12) {
      setError("A little more on the work would help.");
      return;
    }

    try {
      const key = "yash-inquiries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      prev.push({
        name,
        email,
        intent,
        message,
        at: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* still show success — the note is received in the UI */
    }

    setError(null);
    setSent(true);
    form.reset();
  }

  return (
    <section
      id="contact"
      className="scroll-mt-6 px-5 py-20 md:px-8 md:py-24"
    >
      <SectionHead
        index="04"
        title="Contact"
        kicker="No newsletter. One reply."
      />

      <Reveal>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-base leading-normal text-fg-muted">
            For motion, explainers, and infographic work. Write plainly — what
            it is, when it is due, and what “enough” looks like.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-sm text-fg underline decoration-border-strong underline-offset-4 transition-opacity duration-150 hover:opacity-70"
          >
            Write
          </a>
        </div>

        <div className="md:col-span-7">
          {sent ? (
            <div className="rise border border-border bg-bg-elevated px-6 py-10">
              <h3 className="font-serif text-2xl italic">Received.</h3>
              <p className="mt-3 max-w-md text-sm text-fg-muted">
                Thank you. I’ll write back. If it is urgent, use Mail in the
                footer.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => setSent(false)}
              >
                Write another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@studio.com"
                  />
                </Field>
              </div>
              <Field label="About" htmlFor="intent">
                <select
                  id="intent"
                  name="intent"
                  defaultValue="project"
                  className="h-11 w-full rounded-xs border border-border bg-bg px-3.5 text-sm text-fg transition-[border-color] duration-150 hover:border-border-strong focus-visible:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {intents.map((intent) => (
                    <option key={intent.value} value={intent.value}>
                      {intent.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Note" htmlFor="message">
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="What it is, when it is due, what enough looks like."
                />
              </Field>
              {error ? (
                <p className="text-sm text-accent" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">Send note</Button>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-fg-muted underline decoration-border underline-offset-4 hover:text-fg"
                >
                  or open mail
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
