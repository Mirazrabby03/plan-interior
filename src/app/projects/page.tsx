import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { RevealImage } from "@/components/RevealImage";
import { groupByRoom, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Residential interiors designed and built by Plan Interior Solution.",
};

export default function ProjectsPage() {
  return (
    <div className="container-luxe pb-28 pt-40 md:pb-44 md:pt-52">
      <header className="grid gap-8 md:grid-cols-12">
        <Reveal as="p" className="eyebrow text-stone md:col-span-3">Projects</Reveal>
        <Reveal as="h1" className="font-display text-display md:col-span-9">
          Homes, <em>composed.</em>
        </Reveal>
      </header>

      <div className="mt-24 grid gap-x-8 gap-y-24 md:mt-36 md:grid-cols-2">
        {projects.map((project, i) => {
          const rooms = groupByRoom(project).map((g) => g.label);
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group block ${i % 2 ? "md:mt-40" : ""}`}
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03]">
                  <RevealImage
                    image={project.images[project.cover]}
                    alt={project.name}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    aspect="4/5"
                    priority={i === 0}
                  />
                </div>
              </div>
              <div className="mt-8 flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-[clamp(2rem,3.4vw,3.4rem)] leading-none">
                    <span className="link-line">{project.name}</span>
                  </h2>
                  <p className="mt-4 max-w-sm text-stone">{project.summary}</p>
                </div>
              </div>
              <p className="eyebrow mt-6 text-stone/80">
                {project.location} &nbsp;·&nbsp; {rooms.length} spaces
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
