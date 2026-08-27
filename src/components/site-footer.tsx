import { Link } from "@tanstack/react-router";
import { nav, profile, works } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Reveal>
      <div className="mx-auto grid max-w-5xl gap-12 px-5 pb-12 pt-8 md:grid-cols-12 md:px-8 md:pb-16 md:pt-10">
        <div className="md:col-span-5">
          <p className="font-sans text-sm font-medium">{profile.name}</p>
          <p className="text-sm text-fg-muted">{profile.role}</p>
          <p className="mt-6 max-w-sm font-serif text-xl italic leading-snug text-fg">
            {profile.philosophy}.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs tracking-wide text-fg-subtle">Pages</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={`/#${item.href}`}
                  className="text-sm text-fg-muted transition-colors duration-200 ease-out hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs tracking-wide text-fg-subtle">Work</p>
          <ul className="mt-3 space-y-2">
            {works.map((work) => (
              <li key={work.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: work.slug }}
                  className="text-sm text-fg-muted transition-colors duration-200 ease-out hover:text-fg"
                >
                  {work.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm text-fg-muted transition-[color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:text-fg"
              >
                {social.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm text-fg-muted transition-[color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:text-fg"
            >
              Mail
            </a>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 pb-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {year} {profile.name}
          </p>
        </div>
      </div>
      </Reveal>
    </footer>
  );
}
