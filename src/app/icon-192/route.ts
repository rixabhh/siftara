const icon192 = `<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="192" height="192" rx="48" fill="url(#g)"/>
  <path d="M58 68L96 48L134 68V96L96 116L58 96V68Z" fill="white" fill-opacity="0.3"/>
  <path d="M74 78L96 68L118 78V96L96 106L74 96V78Z" fill="white" fill-opacity="0.6"/>
  <path d="M84 88L96 82L108 88V96L96 102L84 96V88Z" fill="white"/>
</svg>`;

export const runtime = "edge";

export async function GET() {
  return new Response(icon192, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
