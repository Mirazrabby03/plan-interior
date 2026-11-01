import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { ArrowLink } from "@/components/ArrowLink";
import { getProject, groupByRoom, projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { images: [project.images[project.cover].src] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const groups = groupByRoom(project);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const cover = project.images[project.cover];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden text-bone">
        <Image
          src={cover.src}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="animate-[drift_9s_var(--ease-luxe)_both] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/5 to-night/70" />
        <div className="container-luxe relative flex h-full flex-col justify-end pb-16 md:pb-20">
          <p className="eyebrow animate-[fade-in_1.2s_0.3s_both] text-bone/80">{project.location}</p>
          <h1 className="mt-6 overflow-hidden font-display text-display">
            <span className="block animate-[rise_1.4s_0.2s_var(--ease-luxe)_both]">{project.name}</span>
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section className="container-luxe py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <dl className="grid grid-cols-2 gap-8 self-start border-t border-ink/15 pt-8 md:col-span-4 md:grid-cols-1">
            {[
              ["Location", project.location],
              ["Scope", project.scope],
              ["Spaces", groups.map((g) => g.label).join(", ")],
            ].map(([term, value]) => (
              <Reveal as="div" key={term}>
                <dt className="eyebrow text-stone">{term}</dt>
                <dd className="mt-2">{value}</dd>
              </Reveal>
            ))}
            <Reveal as="div">
              <dt className="eyebrow text-stone">Palette</dt>
              <dd className="mt-3 flex gap-2">
                {project.palette.map((c) => (
                  <span key={c} className="h-8 w-8 rounded-full border border-ink/10" style={{ background: c }} title={c} />
                ))}
              </dd>
            </Reveal>
          </dl>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal as="p" className="font-display text-statement">{project.summary}</Reveal>
            <div className="mt-10 space-y-6 text-stone">
              {project.intro.map((para, i) => (
                <Reveal as="p" key={i} delay={i * 100}>{para}</Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-luxe pb-28 md:pb-44">
        <Gallery groups={groups} projectName={project.name} />
      </section>

      {/* Next project */}
      <Link href={`/projects/${next.slug}`} className="group relative block h-[70svh] min-h-[460px] overflow-hidden text-bone">
        <Image
          src={next.images[next.cover].src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-night/50 transition-colors duration-700 group-hover:bg-night/40" />
        <div className="container-luxe relative flex h-full flex-col items-start justify-end pb-16">
          <p className="eyebrow text-bone/70">Next residence</p>
          <p className="mt-4 font-display text-title">{next.name}</p>
          <span className="mt-8 eyebrow link-line">View project</span>
        </div>
      </Link>

      <div className="container-luxe py-12">
        <ArrowLink href="/projects">All projects</ArrowLink>
      </div>
    </>
  );
}
