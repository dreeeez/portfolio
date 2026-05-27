const CDN = process.env.NEXT_PUBLIC_VIDEO_CDN ?? "";

export function videoUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  const file = path.startsWith("/videos/") ? path.slice("/videos/".length) : path;
  if (!CDN) return `/videos/${file}`;
  const base = CDN.endsWith("/") ? CDN.slice(0, -1) : CDN;
  return `${base}/${file}`;
}
