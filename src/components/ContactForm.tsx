"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

const projectTypes = ["Full home", "Single room", "Kitchen", "Bathroom", "Commercial", "Other"];

const field =
  "peer w-full border-0 border-b border-ink/25 bg-transparent px-0 pb-3 pt-6 text-lg outline-none transition-colors placeholder:text-transparent focus:border-ink";
const label =
  "eyebrow pointer-events-none absolute left-0 top-6 text-stone transition-all duration-300 peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0";

// Enquiry form with no backend: composes the message and opens WhatsApp (or email).
export function ContactForm() {
  const [type, setType] = useState(projectTypes[0]);

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    return [
      `Hello ${site.name},`,
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Project: ${type}`,
      data.get("location") ? `Location: ${data.get("location")}` : "",
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = encodeURIComponent(compose(e.currentTarget));
    window.open(`${site.whatsapp}?text=${text}`, "_blank", "noopener");
  }

  function onEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form?.reportValidity()) return;
    const body = encodeURIComponent(compose(form));
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
        {[
          { name: "name", text: "Your name", type: "text", required: true, autoComplete: "name" },
          { name: "phone", text: "Phone", type: "tel", required: true, autoComplete: "tel" },
        ].map((f) => (
          <div key={f.name} className="relative">
            <input id={f.name} name={f.name} type={f.type} required={f.required} autoComplete={f.autoComplete} placeholder={f.text} className={field} />
            <label htmlFor={f.name} className={label}>{f.text}</label>
          </div>
        ))}
      </div>

      <fieldset>
        <legend className="eyebrow mb-4 text-stone">Project type</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                type === t ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <input id="location" name="location" type="text" placeholder="Location" className={field} />
        <label htmlFor="location" className={label}>Location (area, city)</label>
      </div>

      <div className="relative">
        <textarea id="message" name="message" rows={4} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>Tell us about your space</label>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          className="eyebrow bg-ink px-8 py-4 text-bone transition-colors duration-500 hover:bg-bronze"
        >
          Send via WhatsApp
        </button>
        <button type="button" onClick={onEmail} className="eyebrow link-line text-stone hover:text-ink">
          or send by email
        </button>
      </div>
    </form>
  );
}
