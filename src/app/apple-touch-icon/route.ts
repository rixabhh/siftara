const appleTouchIcon = `<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="40" fill="url(#g)"/>
  <path d="M54 64L90 44L126 64V90L90 110L54 90V64Z" fill="white" fill-opacity="0.3"/>
  <path d="M68 74L90 64L112 74V90L90 100L68 90V74Z" fill="white" fill-opacity="0.6"/>
  <path d="M78 84L90 78L102 84V90L90 96L78 90V84Z" fill="white"/>
</svg>`;

export const runtime = "edge";

export async function GET() {
  return new Response(appleTouchIcon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
