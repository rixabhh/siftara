const icon = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="40" height="40" rx="10" fill="url(#g)"/>
  <path d="M12 14L20 10L28 14V20L20 24L12 20V14Z" fill="white" fill-opacity="0.3"/>
  <path d="M16 16L20 14L24 16V20L20 22L16 20V16Z" fill="white" fill-opacity="0.6"/>
  <path d="M18 18L20 17L22 18V20L20 21L18 20V18Z" fill="white"/>
</svg>`;

export default function IconPage() {
  return null;
}

export const runtime = "edge";

export async function GET() {
  return new Response(icon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
