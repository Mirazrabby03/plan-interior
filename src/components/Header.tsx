"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/data/site";

// Pages that open on a full-bleed dark image, where the header starts in light-on-dark.
const overHero = (path: string) => path === "/" || path.startsWith("/projects/");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The menu records the page it was opened on, so navigating away closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  // Solid background once scrolled; hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = overHero(pathname) && !scrolled && !open;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-[var(--ease-luxe)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          light
            ? "border-b border-transparent text-bone"
            : "border-b border-ink/10 bg-bone/85 text-ink backdrop-blur-md",
        ].join(" ")}
      >
        <div className="container-luxe flex h-20 items-center justify-between md:h-24">
          <Link href="/" aria-label={`${site.name}, home`}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="eyebrow link-line"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={[
              "eyebrow hidden border px-5 py-3 transition-colors duration-500 lg:inline-block",
              light
                ? "border-bone/40 hover:bg-bone hover:text-ink"
                : "border-ink/25 hover:bg-ink hover:text-bone",
            ].join(" ")}
          >
            Book a consultation
          </Link>

          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            className="eyebrow flex items-center gap-3 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-2.5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={[
          "fixed inset-0 z-40 flex flex-col justify-between bg-bone px-4 pb-10 pt-28 transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpenOn(null)}
              className="font-display text-5xl leading-tight transition-[opacity,transform] duration-700 ease-[var(--ease-luxe)]"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(16px)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 text-sm text-stone">
          <a href={site.phoneHref} className="block">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block">{site.email}</a>
        </div>
      </div>
    </>
  );
}
