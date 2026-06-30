"use client";

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  resolvedTheme: "light",
});

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("siftara-theme") as Theme) || "light";
}

function resolveTheme(t: Theme): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  if (t === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => resolveTheme(getInitialTheme()));

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem("siftara-theme", t);
    setThemeState(t);
    const r = resolveTheme(t);
    setResolvedTheme(r);
    applyTheme(r);
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const stored = localStorage.getItem("siftara-theme") as Theme;
      if (stored === "system" || !stored) {
        const r = resolveTheme("system");
        setResolvedTheme(r);
        applyTheme(r);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
