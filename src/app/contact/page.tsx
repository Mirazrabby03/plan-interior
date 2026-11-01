import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { RevealImage } from "@/components/RevealImage";
import { imageAt } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a consultation with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="container-luxe pb-28 pt-40 md:pb-40 md:pt-52">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal as="p" className="eyebrow text-stone">Contact</Reveal>
          <Reveal as="h1" className="mt-6 font-display text-title">
            Let&rsquo;s talk about <em>your home.</em>
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-md text-stone">
            Share a few details and we&rsquo;ll arrange a consultation at our studio, on site, or over a call.
            We usually reply within one working day.
          </Reveal>
          <div className="mt-16">
            <ContactForm />
          </div>
        </div>

        <aside className="md:col-span-5 md:col-start-8">
          <RevealImage
            image={imageAt("cumilla", 0)}
            alt="Cumilla Residence living room"
            sizes="(min-width: 768px) 40vw, 100vw"
            aspect="4/5"
            priority
          />
          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            <Reveal as="div">
              <dt className="eyebrow text-stone">Studio</dt>
              <dd className="mt-3">
                <address className="not-italic">
                  {site.address.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
              </dd>
            </Reveal>
            <Reveal as="div">
              <dt className="eyebrow text-stone">Direct</dt>
              <dd className="mt-3 space-y-1">
                <a className="link-line block w-fit" href={site.phoneHref}>{site.phone}</a>
                <a className="link-line block w-fit break-all" href={`mailto:${site.email}`}>{site.email}</a>
                <span className="block text-stone">{site.hours}</span>
              </dd>
            </Reveal>
          </dl>
        </aside>
      </div>
    </div>
  );
}
