export function SiftaraLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
      <path
        d="M12 14L20 10L28 14V20L20 24L12 20V14Z"
        fill="white"
        fillOpacity="0.3"
      />
      <path
        d="M16 16L20 14L24 16V20L20 22L16 20V16Z"
        fill="white"
        fillOpacity="0.6"
      />
      <path
        d="M18 18L20 17L22 18V20L20 21L18 20V18Z"
        fill="white"
      />
    </svg>
  );
}

export function SiftaraLogoWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold">Sift</span>
      <span className="font-bold text-primary">ara</span>
    </span>
  );
}
