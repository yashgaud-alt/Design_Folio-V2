import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { VimeoEmbed } from "@/components/vimeo-embed";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { getWork, neighbors } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  component: WorkPage,
});

function WorkPage() {
  const { slug } = Route.useParams();
  const work = getWork(slug);

  if (!work) {
    return (
      <main className="px-5 py-24 md:px-8">
        <h1 className="font-serif text-3xl">This cut is not here.</h1>
        <Button asChild className="mt-8">
          <Link to="/" hash="work">
            Back to works
          </Link>
        </Button>
      </main>
    );
  }

  const { prev, next } = neighbors(work.slug);

  return (
    <main className="px-5 pb-24 pt-10 md:px-8 md:pt-14">
      <Link
        to="/"
        hash="work"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
      >
        <ArrowLeft className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" strokeWidth={1.6} />
        Works
      </Link>

      <h1 className="mt-10 max-w-3xl font-serif text-3xl leading-tight tracking-tight md:text-4xl">
        {work.title}
      </h1>
      <p className="mt-4 text-sm text-fg-subtle">
        {work.year} · {work.role} · {work.duration}
      </p>

      <div className="mt-8">
        <VimeoEmbed id={work.vimeoId} title={work.title} still={work.still} />
      </div>

      <Reveal eager>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-xl text-lg leading-normal text-fg">
            {work.description}
          </p>
        </div>
        <aside className="md:col-span-5">
          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-fg-subtle">Year</dt>
              <dd className="col-span-2">{work.year}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-fg-subtle">Role</dt>
              <dd className="col-span-2">{work.role}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-fg-subtle">Length</dt>
              <dd className="col-span-2 tabular-nums">{work.duration}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-fg-subtle">Tags</dt>
              <dd className="col-span-2">{work.categories.join(" · ")}</dd>
            </div>
          </dl>
          <a
            href={`https://vimeo.com/${work.vimeoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm text-fg underline decoration-border-strong underline-offset-4 hover:opacity-70"
          >
            Open on Vimeo
            <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
          </a>
        </aside>
      </div>
      </Reveal>

      <nav
        className="mt-16 flex items-center justify-between gap-4"
        aria-label="Adjacent works"
      >
        {prev ? (
          <Link
            to="/work/$slug"
            params={{ slug: prev.slug }}
            className="group flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" strokeWidth={1.6} />
            <span>
              <span className="block text-xs text-fg-subtle">Previous</span>
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group flex min-h-11 items-center gap-2 text-right text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <span>
              <span className="block text-xs text-fg-subtle">Next</span>
              {next.title}
            </span>
            <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" strokeWidth={1.6} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
