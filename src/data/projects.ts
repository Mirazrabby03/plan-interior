import images from "./images.json";

export type ProjectImage = {
  src: string;
  room: string;
  width: number;
  height: number;
};

export type Project = {
  slug: "shekhertek" | "cumilla";
  name: string;
  location: string;
  scope: string;
  summary: string;
  intro: string[];
  palette: string[];
  cover: number;
  hero: number[];
  images: ProjectImage[];
};

// Display order and headings for room groups on a project page.
export const roomOrder: { room: string; label: string }[] = [
  { room: "foyer", label: "Arrival" },
  { room: "living", label: "Living" },
  { room: "dining", label: "Dining" },
  { room: "kitchen", label: "Kitchen" },
  { room: "bedroom", label: "Bedrooms" },
  { room: "wardrobe", label: "Wardrobes" },
  { room: "dressing", label: "Dressing" },
  { room: "bath", label: "Bathrooms" },
];

export const projects: Project[] = [
  {
    slug: "shekhertek",
    name: "Shekhertek Residence",
    location: "Shekhertek, Mohammadpur, Dhaka",
    scope: "Full interior design & build",
    summary: "A light-filled family apartment in ivory, travertine and smoked oak.",
    intro: [
      "A complete transformation of a family apartment in Mohammadpur. We set out to make the home feel calm and generous: a single palette of ivory panelling, warm travertine and smoked-oak doors runs through every room, held together by layered cove lighting in the ceilings.",
      "Public rooms open into one another around a lattice-detailed dining space, while the private wing is a sequence of quiet bedrooms, a dressing room and stone-clad bathrooms, each with its own soft, indirect light.",
    ],
    palette: ["#EFE9E1", "#D8CBB8", "#A8927A", "#6B5A4A", "#2E2924"],
    cover: 3,
    hero: [3, 1, 6],
    images: images.shekhertek,
  },
  {
    slug: "cumilla",
    name: "Cumilla Residence",
    location: "Cumilla, Bangladesh",
    scope: "Full interior design & build",
    summary: "A warm, sculptural home of blush tones, grey stone and bronze detail.",
    intro: [
      "A family home in Cumilla designed around texture. Sculpted feature walls, fluted panels and bronze-framed shelving give each room a tactile character, softened by a palette of blush, sand and pale marble.",
      "The open living and dining spaces are anchored by bespoke joinery, while bedrooms, framed by upholstered headboards and full-height wardrobes, are kept soft and restful. Bathrooms move into a darker register of grey stone and backlit mirrors.",
    ],
    palette: ["#F3ECE8", "#E4CFC6", "#B88E7A", "#7A7570", "#33302D"],
    cover: 1,
    hero: [1, 4, 2],
    images: images.cumilla,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function groupByRoom(project: Project) {
  return roomOrder
    .map(({ room, label }) => ({
      room,
      label,
      images: project.images.filter((img) => img.room === room),
    }))
    .filter((group) => group.images.length > 0);
}

export function imageAt(slug: Project["slug"], index: number) {
  return images[slug][index];
}
