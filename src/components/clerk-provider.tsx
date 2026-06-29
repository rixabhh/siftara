"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <OriginalClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          rootBox: "w-full",
          card: "bg-surface border border-border shadow-sm",
        },
      }}
    >
      {children}
    </OriginalClerkProvider>
  );
}
