"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { Reveal, useReveal } from "./Reveal";

type Group = { room: string; label: string; images: ProjectImage[] };

type TileProps = {
  image: ProjectImage;
  alt: string;
  label: string;
  wide: boolean;
  delay: number;
  onOpen: () => void;
};

// Single gallery image: curtain-reveals on scroll, opens the lightbox on click.
function GalleryTile({ image, alt, label, wide, delay, onOpen }: TileProps) {
  const [ref, shown] = useReveal<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-reveal-image=""
      data-shown={shown ? "" : undefined}
      className={`group relative block cursor-zoom-in overflow-hidden bg-paper ${wide ? "sm:col-span-2" : ""}`}
      style={{ aspectRatio: wide ? "16/9" : "4/5", ["--reveal-delay" as string]: `${delay}ms` }}
      aria-label={label}
    >
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={wide ? "(min-width: 768px) 75vw, 100vw" : "(min-width: 768px) 37vw, (min-width: 640px) 50vw, 100vw"}
        className="object-cover"
      />
      <span className="absolute inset-0 bg-night/0 transition-colors duration-700 group-hover:bg-night/15" />
    </button>
  );
}

// Room-grouped editorial gallery with a fullscreen, keyboard-navigable lightbox.
export function Gallery({ groups, projectName }: { groups: Group[]; projectName: string }) {
  const all = groups.flatMap((g) => g.images.map((img) => ({ ...img, label: g.label })));
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + all.length) % all.length)),
    [all.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  let index = 0;

  return (
    <>
      <div className="space-y-24 md:space-y-36">
        {groups.map((group) => (
          <section key={group.room} className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <div className="md:sticky md:top-32">
                <Reveal as="h3" className="font-display text-4xl md:text-5xl">{group.label}</Reveal>
              </div>
            </div>
            <div className={`grid gap-4 md:col-span-9 md:gap-6 ${group.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {group.images.map((img, i) => {
                const at = index++;
                // A lone or third image spans the full width for rhythm.
                const wide = group.images.length === 1 || (i === 2 && group.images.length === 3);
                return (
                  <GalleryTile
                    key={img.src}
                    image={img}
                    alt={`${projectName}, ${group.label}`}
                    label={`Open ${group.label} image ${i + 1} in fullscreen`}
                    wide={wide}
                    delay={i * 120}
                    onOpen={() => setOpen(at)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex animate-[fade-in_0.4s_both] flex-col bg-night text-bone"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} gallery`}
          data-lenis-prevent=""
        >
          <div className="container-luxe flex h-20 shrink-0 items-center justify-between">
            <p className="eyebrow text-bone/70">
              {all[open].label} <span className="mx-3 text-bone/30">/</span> {open + 1} / {all.length}
            </p>
            <button type="button" onClick={close} className="eyebrow link-line" autoFocus>
              Close
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={close}>
            <Image
              key={all[open].src}
              src={all[open].src}
              alt={`${projectName}, ${all[open].label}`}
              fill
              sizes="100vw"
              className="animate-[fade-in_0.6s_both] object-contain px-4 md:px-24"
            />
          </div>
          <div className="container-luxe flex h-20 shrink-0 items-center justify-between">
            <button type="button" onClick={() => step(-1)} className="eyebrow link-line">Previous</button>
            <button type="button" onClick={() => step(1)} className="eyebrow link-line">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
