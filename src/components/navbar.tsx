"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiftaraLogo } from "@/components/siftara-logo";
import { MegaMenu } from "@/components/mega-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 120);
  }, [cancelClose]);

  const openMega = useCallback(() => {
    cancelClose();
    setMegaOpen(true);
  }, [cancelClose]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <SiftaraLogo className="h-8 w-8 transition-transform group-hover:scale-105" />
          <span className="text-lg font-bold tracking-tight">
            Sift<span className="text-primary">ara</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <div
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
          >
            <Link
              href="/courses"
              className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/courses"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              Explore
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
              {pathname === "/courses" && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {[
            { href: "/dashboard", label: "Dashboard", show: isSignedIn },
            { href: "/my-sift", label: "My Sift", show: true },
            { href: "/pricing", label: "Pricing", show: true },
            { href: "/launch", label: "Launch", show: true },
            { href: "/certificates", label: "Certificates", show: isSignedIn },
          ]
            .filter((l) => l.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: { avatarBox: "h-8 w-8" },
              }}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-8">
                {[
                  { href: "/courses", label: "Explore" },
                  { href: "/dashboard", label: "Dashboard", show: isSignedIn },
                  { href: "/my-sift", label: "My Sift" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/launch", label: "Launch" },
                  { href: "/certificates", label: "Certificates", show: isSignedIn },
                ]
                  .filter((l) => l.show !== false)
                  .map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors block ${
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                {!isSignedIn && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 flex flex-col gap-2"
                  >
                    <Button variant="outline" asChild>
                      <Link href="/sign-in" onClick={() => setMobileOpen(false)}>Sign in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/sign-up" onClick={() => setMobileOpen(false)}>Get Started</Link>
                    </Button>
                  </motion.div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mega Menu — hover bridge stays open when mouse moves between trigger and dropdown */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={scheduleClose}
      >
        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </div>
    </header>
  );
}
