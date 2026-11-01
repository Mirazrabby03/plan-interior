"use client";

import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import { useReveal } from "./Reveal";

type Props = {
  image: ProjectImage;
  alt: string;
  sizes: string;
  className?: string;
  /** Crop to a fixed aspect ratio (e.g. "4/5"); defaults to the image's own. */
  aspect?: string;
  delay?: number;
  priority?: boolean;
};

// Image that unveils as a curtain lifts away when scrolled into view.
export function RevealImage({ image, alt, sizes, className = "", aspect, delay = 0, priority }: Props) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal-image=""
      data-shown={shown ? "" : undefined}
      className={`relative overflow-hidden bg-paper ${className}`}
      style={{
        aspectRatio: aspect ?? `${image.width}/${image.height}`,
        ["--reveal-delay" as string]: `${delay}ms`,
      }}
    >
      <Image src={image.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
