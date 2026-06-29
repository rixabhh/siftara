"use client";

import { createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("siftara-theme") as Theme) || "system";
}

function resolveTheme(t: Theme): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  if (t === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", callback);
  return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", callback);
}

function getSnapshot() {
  return getStoredTheme();
}

function getServerSnapshot() {
  return "system" as Theme;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem("siftara-theme", t);
    const r = resolveTheme(t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(r);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
