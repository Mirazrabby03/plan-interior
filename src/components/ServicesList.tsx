"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { Reveal } from "./Reveal";

type Service = { title: string; body: string; image: ProjectImage };

// Numbered service rows; the hovered/focused row swaps the image in the sticky panel.
export function ServicesList({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-16">
      <ol className="md:col-span-7">
        {services.map((service, i) => (
          <Reveal as="li"
            key={service.title}
           
            delay={i * 90}
            className="border-t border-ink/15 last:border-b"
          >
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group block w-full py-8 text-left md:py-10"
              aria-pressed={active === i}
            >
              <span>
                <span
                  className={`block font-display text-[clamp(1.9rem,3.4vw,3.4rem)] leading-none transition-[color,transform] duration-700 ease-[var(--ease-luxe)] ${
                    active === i ? "translate-x-2 text-ink" : "text-ink/45 group-hover:text-ink/80"
                  }`}
                >
                  {service.title}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-luxe)] ${
                    active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block max-w-md pt-4 text-stone">{service.body}</span>
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ol>

      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-32 aspect-[4/5] overflow-hidden bg-paper">
          {services.map((service, i) => (
            <Image
              key={service.title}
              src={service.image.src}
              alt=""
              fill
              sizes="40vw"
              className="object-cover transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-luxe)]"
              style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.06)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
