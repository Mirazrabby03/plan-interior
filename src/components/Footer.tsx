import Link from "next/link";
import { LogoMark } from "./Logo";
import { nav, site } from "@/data/site";
import { projects } from "@/data/projects";

// Resolved at build time; the site is a static export.
function Year() {
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="bg-paper text-ink">
      <div className="container-luxe pb-10 pt-24 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-bronze">Start a conversation</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 block font-display text-[clamp(2rem,4.4vw,4.5rem)] leading-[1.02] tracking-tight transition-colors duration-500 hover:text-bronze"
            >
              Let&rsquo;s design a home
              <br />
              <em>that feels like yours.</em>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:col-span-6 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-5 text-stone">Studio</p>
              <address className="not-italic leading-relaxed text-ink-soft">
                {site.address.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            </div>
            <div>
              <p className="eyebrow mb-5 text-stone">Contact</p>
              <ul className="space-y-2 text-ink-soft">
                <li><a className="link-line" href={site.phoneHref}>{site.phone}</a></li>
                <li><a className="link-line break-all" href={`mailto:${site.email}`}>{site.email}</a></li>
                <li><a className="link-line" href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
                <li><a className="link-line" href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-stone">Explore</p>
              <ul className="space-y-2 text-ink-soft">
                {nav.map((item) => (
                  <li key={item.href}><Link className="link-line" href={item.href}>{item.label}</Link></li>
                ))}
                {projects.map((p) => (
                  <li key={p.slug}><Link className="link-line" href={`/projects/${p.slug}`}>{p.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 flex items-end justify-between gap-6 border-t border-ink/15 pt-8">
          <div className="flex items-center gap-4">
            <LogoMark className="h-10 w-auto text-ink" />
            <p className="text-xs text-stone">
              &copy; <Year /> {site.name}. {site.hours}.
            </p>
          </div>
          <p className="eyebrow hidden text-stone sm:block">Across Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
