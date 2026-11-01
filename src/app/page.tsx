import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { Reveal } from "@/components/Reveal";
import { RevealImage } from "@/components/RevealImage";
import { RoomCarousel } from "@/components/RoomCarousel";
import { ServicesList } from "@/components/ServicesList";
import { ArrowLink } from "@/components/ArrowLink";
import { imageAt, projects } from "@/data/projects";
import { process, services, site } from "@/data/site";

const heroSlides = [
  { image: imageAt("shekhertek", 3), caption: "Shekhertek, Dining" },
  { image: imageAt("cumilla", 1), caption: "Cumilla, Living" },
  { image: imageAt("shekhertek", 7), caption: "Shekhertek, Bedroom" },
  { image: imageAt("cumilla", 4), caption: "Cumilla, Bedroom" },
].map(({ image, caption }) => ({ src: image.src, alt: caption, caption }));

const rooms = [
  { image: imageAt("shekhertek", 1), label: "Living", project: "shekhertek" },
  { image: imageAt("cumilla", 3), label: "Kitchen", project: "cumilla" },
  { image: imageAt("shekhertek", 9), label: "Dressing", project: "shekhertek" },
  { image: imageAt("cumilla", 8), label: "Bath", project: "cumilla" },
  { image: imageAt("shekhertek", 6), label: "Bedroom", project: "shekhertek" },
  { image: imageAt("cumilla", 2), label: "Dining", project: "cumilla" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] text-bone">
        <HeroSlideshow slides={heroSlides} />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-24 md:pb-28">
          <p className="eyebrow mb-6 animate-[fade-in_1.2s_0.3s_both] text-bone/80">
            Interior design &amp; build across Bangladesh
          </p>
          <h1 className="font-display text-display">
            {["Quietly", "extraordinary", "homes."].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={`block animate-[rise_1.4s_var(--ease-luxe)_both] ${i === 1 ? "pl-[0.6em] italic" : ""}`}
                  style={{ animationDelay: `${200 + i * 140}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <div className="mt-10 animate-[fade-in_1.2s_1s_both]">
            <ArrowLink href="/projects">View the work</ArrowLink>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="container-luxe scroll-mt-24 py-28 md:py-44">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal as="p" className="eyebrow text-stone md:col-span-3">The studio</Reveal>
          <Reveal as="p" delay={100} className="font-display text-statement md:col-span-9">
            {site.name} is a design-and-build studio working across Bangladesh. We create homes that feel calm,
            composed and entirely personal, <em className="text-bronze">and we build exactly what we draw.</em>
          </Reveal>
        </div>

        <div className="mt-20 grid items-end gap-10 md:mt-32 md:grid-cols-12">
          <RevealImage
            image={imageAt("shekhertek", 0)}
            alt="Shekhertek Residence foyer with fluted console"
            sizes="(min-width: 768px) 40vw, 100vw"
            aspect="4/5"
            className="md:col-span-5"
          />
          <div className="md:col-span-6 md:col-start-7">
            <RevealImage
              image={imageAt("cumilla", 2)}
              alt="Cumilla Residence dining room"
              sizes="(min-width: 768px) 50vw, 100vw"
              aspect="3/2"
              delay={150}
            />
            <div className="mt-12 grid gap-8 text-stone sm:grid-cols-2">
              <Reveal as="p">
                Every project begins with how you live: the rituals of a morning, where the light falls, what
                you want to come home to. From there we compose each room with restraint: honest materials,
                considered light and joinery made to measure.
              </Reveal>
              <Reveal as="p" delay={120}>
                Because our own team carries the work from concept to handover, the finished home matches the
                design down to the last detail. One studio, one point of contact, nothing lost in
                translation.
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-paper py-28 [--curtain:var(--color-paper)] md:py-40">
        <div className="container-luxe">
          <div className="mb-16 flex items-end justify-between gap-6 md:mb-24">
            <div>
              <Reveal as="p" className="eyebrow text-stone">Selected work</Reveal>
              <Reveal as="h2" delay={100} className="mt-6 font-display text-title">
                Recent residences
              </Reveal>
            </div>
            <div className="hidden sm:block">
              <ArrowLink href="/projects">All projects</ArrowLink>
            </div>
          </div>

          <div className="space-y-28 md:space-y-40">
            {projects.map((project, i) => (
              <article key={project.slug} className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
                <Link
                  href={`/projects/${project.slug}`}
                  className={`group block md:col-span-8 ${i % 2 ? "md:order-2" : ""}`}
                  aria-label={`View ${project.name}`}
                >
                  <RevealImage
                    image={project.images[project.cover]}
                    alt={`${project.name}, ${project.images[project.cover].room}`}
                    sizes="(min-width: 768px) 66vw, 100vw"
                    aspect="16/11"
                  />
                </Link>
                <div className={`md:col-span-4 ${i % 2 ? "md:order-1" : ""}`}>
                  <Reveal as="p" className="eyebrow text-stone">
                    {project.location}
                  </Reveal>
                  <Reveal as="h3"
                   
                    delay={80}
                    className="mt-5 font-display text-[clamp(2.2rem,3.6vw,3.6rem)] leading-none"
                  >
                    {project.name}
                  </Reveal>
                  <Reveal as="p" delay={160} className="mt-6 max-w-sm text-stone">
                    {project.summary}
                  </Reveal>
                  <Reveal as="div" delay={240} className="mt-8 flex items-center gap-4">
                    <span className="flex">
                      {project.palette.map((c) => (
                        <span
                          key={c}
                          className="-ml-1 h-5 w-5 rounded-full ring-2 ring-paper first:ml-0"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                    <span className="eyebrow text-stone">Material palette</span>
                  </Reveal>
                  <ArrowLink href={`/projects/${project.slug}`} className="mt-10">
                    Explore the residence
                  </ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Room by room */}
      <section className="py-28 md:py-40">
        <div className="container-luxe mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
          <Reveal as="p" className="eyebrow text-stone md:col-span-3">Room by room</Reveal>
          <Reveal as="h2" delay={100} className="font-display text-title md:col-span-9">
            Every room, <em>considered.</em>
          </Reveal>
        </div>
        <RoomCarousel label="Rooms by Plan Interior Solution">
          {rooms.map((room, i) => (
            <Link
              key={room.image.src}
              href={`/projects/${room.project}`}
              className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw]"
            >
              <RevealImage
                image={room.image}
                alt={`${room.label} by ${site.name}`}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw"
                aspect="3/4"
                delay={i * 80}
              />
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-2xl">{room.label}</span>
                <span className="eyebrow text-stone">
                  {room.project === "shekhertek" ? "Shekhertek" : "Cumilla"}
                </span>
              </div>
            </Link>
          ))}
        </RoomCarousel>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 pb-28 md:pb-44">
        <div className="container-luxe">
          <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
            <Reveal as="p" className="eyebrow text-stone md:col-span-3">Services</Reveal>
            <Reveal as="h2" delay={100} className="font-display text-title md:col-span-9">
              From first sketch <em>to final styling.</em>
            </Reveal>
          </div>
          <ServicesList
            services={services.map((s) => ({ ...s, image: imageAt(s.image.project, s.image.index) }))}
          />
        </div>
      </section>

      {/* Process */}
      <section className="bg-night py-28 text-bone md:py-40">
        <div className="container-luxe">
          <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
            <Reveal as="p" className="eyebrow text-bone/50 md:col-span-3">Process</Reveal>
            <Reveal as="h2" delay={100} className="font-display text-title md:col-span-9">
              A calm, <em className="text-bronze-light">four-step</em> journey.
            </Reveal>
          </div>
          <ol className="grid border-t border-bone/15 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 110} className="pb-12 pt-10 sm:pr-10">
                <span className="font-display text-6xl text-bronze-light/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-3xl">{step.title}</h3>
                <p className="mt-4 text-bone/65">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative flex min-h-[85svh] items-center overflow-hidden text-bone">
        <Image src={imageAt("shekhertek", 1).src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-night/55" />
        <div className="container-luxe relative text-center">
          <Reveal as="p" className="eyebrow text-bone/75">Begin your project</Reveal>
          <Reveal as="h2" delay={100} className="mx-auto mt-6 max-w-4xl font-display text-title">
            Tell us about the home <em>you have in mind.</em>
          </Reveal>
          <Reveal as="div" delay={200} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="eyebrow bg-bone px-8 py-4 text-ink transition-colors duration-500 hover:bg-bronze-light"
            >
              Book a consultation
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="eyebrow border border-bone/50 px-8 py-4 transition-colors duration-500 hover:bg-bone hover:text-ink"
            >
              WhatsApp us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
