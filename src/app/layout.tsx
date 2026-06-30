import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@/components/clerk-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://siftara.com"),
  title: {
    default: "Siftara - Learn from the best free courses without getting lost",
    template: "%s | Siftara",
  },
  description:
    "Siftara turns carefully chosen free learning content into guided paths with checkpoints, progress, and verifiable certificates.",
  keywords: ["learning paths", "free courses", "certificates", "YouTube learning", "education"],
  authors: [{ name: "Siftara" }],
  creator: "Siftara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siftara.com",
    siteName: "Siftara",
    title: "Siftara - Learn from the best free courses without getting lost",
    description: "Guided learning paths from free content. Roadmaps, checkpoints, progress tracking, and verifiable certificates.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Siftara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siftara - Learn from the best free courses without getting lost",
    description: "Guided learning paths from free content. Roadmaps, checkpoints, progress tracking, and verifiable certificates.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-touch-icon",
    other: [
      { rel: "icon", type: "image/svg+xml", url: "/icon-192" },
      { rel: "icon", type: "image/svg+xml", url: "/icon-512" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7FAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#070A09" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ClerkProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
