import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { isAuthError, isForbiddenError, requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdmin();
  } catch (error) {
    if (isAuthError(error)) redirect("/sign-in");
    if (isForbiddenError(error)) notFound();
    throw error;
  }

  return children;
}
