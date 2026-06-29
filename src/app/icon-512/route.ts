const icon512 = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#g)"/>
  <path d="M155 181L256 128L357 181V256L256 309L155 256V181Z" fill="white" fill-opacity="0.3"/>
  <path d="M197 207L256 181L315 207V256L256 282L197 256V207Z" fill="white" fill-opacity="0.6"/>
  <path d="M224 230L256 218L288 230V256L256 268L224 256V230Z" fill="white"/>
</svg>`;

export const runtime = "edge";

export async function GET() {
  return new Response(icon512, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
