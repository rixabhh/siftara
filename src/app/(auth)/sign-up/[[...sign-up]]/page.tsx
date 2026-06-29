"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4 py-12">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-surface border border-border shadow-lg",
          },
        }}
      />
    </div>
  );
}
