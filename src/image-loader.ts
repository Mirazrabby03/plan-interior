// Static export has no Next image server: in production, resize through Netlify Image CDN.
export default function netlifyLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (process.env.NODE_ENV === "development") return `${src}?w=${width}`;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}
