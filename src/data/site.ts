export const site = {
  name: "Plan Interior Solution",
  shortName: "Plan",
  tagline: "Residential interior design & build across Bangladesh",
  description:
    "Plan Interior Solution designs and builds calm, considered homes across Bangladesh, from the first sketch to the last fitted joint.",
  phone: "+880 1577-179049",
  phoneHref: "tel:+8801577179049",
  whatsapp: "https://wa.me/8801577179049",
  email: "planinteriorsolution@gmail.com",
  hours: "Sat to Thu, 10:00 to 19:00",
  address: ["House 19, Ave-01, Block B, Section 11", "Pallabi, Mirpur, Dhaka-1216", "Bangladesh"],
  social: {
    facebook: "https://facebook.com/planinteriorbd",
    messenger: "https://m.me/planinterior",
  },
} as const;

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/#studio", label: "Studio" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    title: "Interior architecture",
    body: "Space planning, ceilings, wall treatments and lighting layouts drawn around the way you actually live.",
    image: { project: "shekhertek", index: 4 },
  },
  {
    title: "Kitchens & joinery",
    body: "Fitted kitchens, wardrobes, dressing rooms and storage, detailed in-house and built to the millimetre.",
    image: { project: "cumilla", index: 3 },
  },
  {
    title: "Bath & wellness",
    body: "Stone, light and water. Bathrooms designed as quiet, private retreats rather than afterthoughts.",
    image: { project: "shekhertek", index: 10 },
  },
  {
    title: "Turnkey execution",
    body: "One team from concept through civil work, fit-out and styling, so the finished room matches the render.",
    image: { project: "cumilla", index: 0 },
  },
] as const;

export const process = [
  { title: "Listen", body: "A site visit and an honest conversation about how you live, what you love and what it should cost." },
  { title: "Design", body: "Layouts, material boards and photoreal 3D renders of every room, refined with you until it feels right." },
  { title: "Detail", body: "Construction drawings, joinery details and a fixed schedule. No surprises once work begins." },
  { title: "Build", body: "Our craftsmen deliver on site, managed end to end, finishing with styling and a careful handover." },
] as const;
