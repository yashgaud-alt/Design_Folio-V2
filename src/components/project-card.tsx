import { Link } from "@tanstack/react-router";
import type { Work } from "@/lib/site";
import { VimeoEmbed } from "@/components/vimeo-embed";
import { cn } from "@/lib/utils";

export function ProjectCard({
  work,
  className,
}: {
  work: Work;
  className?: string;
}) {
  return (
    <article className={cn(className)}>
      <VimeoEmbed id={work.vimeoId} title={work.title} still={work.still} />
      <div className="pt-3.5">
        <h3 className="font-sans text-lg font-medium tracking-tight">
          <Link
            to="/work/$slug"
            params={{ slug: work.slug }}
            className="text-fg no-underline transition-opacity duration-200 hover:opacity-70"
          >
            {work.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-fg-subtle">
          {work.year} — {work.categories[0]} · {work.duration}
        </p>
        <p className="mt-2 max-w-prose text-sm leading-normal text-fg-muted">
          {work.blurb}
        </p>
      </div>
    </article>
  );
}
