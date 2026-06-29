import {
  siReact,
  siTypescript,
  siJavascript,
  siPython,
  siNodedotjs,
  siTailwindcss,
  siFigma,
  siVercel,
  siCloudflare,
  siGoogle,
  siYoutube,
  siX,
  siGithub,
  siNextdotjs,
} from "simple-icons";

export const brandIcons = {
  react: siReact.path,
  typescript: siTypescript.path,
  javascript: siJavascript.path,
  python: siPython.path,
  nodejs: siNodedotjs.path,
  tailwindcss: siTailwindcss.path,
  figma: siFigma.path,
  vercel: siVercel.path,
  cloudflare: siCloudflare.path,
  google: siGoogle.path,
  youtube: siYoutube.path,
  x: siX.path,
  github: siGithub.path,
  nextjs: siNextdotjs.path,
} as const;

export function BrandIcon({
  brand,
  className = "h-5 w-5",
  ...props
}: {
  brand: keyof typeof brandIcons;
  className?: string;
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      {...props}
    >
      <path d={brandIcons[brand]} />
    </svg>
  );
}
