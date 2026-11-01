"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; caption: string };

const INTERVAL = 6500;

// Full-bleed crossfading slideshow with a slow push-in on the active image.
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-night">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              style={{
                animation: i === active ? `drift ${INTERVAL + 2000}ms linear both` : "none",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/10 to-night/75" />
      </div>

      <div className="absolute inset-x-0 bottom-12 z-10 hidden md:block">
        <div className="container-luxe flex justify-end">
          <div className="flex items-center gap-6 text-bone">
            <p className="eyebrow w-48 text-right text-bone/75" aria-live="polite">
              {slides[active].caption}
            </p>
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative h-8 w-10"
                  aria-label={`Show ${slide.caption}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-bone/30" />
                  <span
                    className="absolute left-0 top-1/2 h-px bg-bone"
                    style={{
                      width: i === active ? "100%" : "0%",
                      transition: i === active ? `width ${INTERVAL}ms linear` : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
