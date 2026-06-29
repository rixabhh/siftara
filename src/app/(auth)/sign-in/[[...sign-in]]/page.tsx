"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4 py-12">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
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
