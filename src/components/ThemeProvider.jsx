"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "motion/react";
import AppLoader from "./AppLoader";

const ThemeContext = createContext(null);
const STORAGE_KEY = "interactive-dashboard-theme";
const LOADER_STORAGE_KEY = "quantro-loader-seen";
const LOADER_MS = 1500;

function applyDirectionalTheme(nextTheme, direction = "ltr") {
  const root = document.documentElement;
  const elements = Array.from(document.querySelectorAll(".themed"));

  const maxX = window.innerWidth || 1;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const x = direction === "ltr" ? rect.left : maxX - rect.right;
    const normalized = Math.max(0, Math.min(1, x / maxX));
    const delay = Math.round(normalized * 280);

    el.style.transitionDelay = `${delay}ms`;
  });

  requestAnimationFrame(() => {
    root.dataset.theme = nextTheme;
  });

  window.setTimeout(() => {
    elements.forEach((el) => {
      el.style.transitionDelay = "";
    });
  }, 800);
}

export function ThemeProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState("dark");
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const nextDirectionRef = useRef("ltr");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);

      const savedTheme = window.localStorage.getItem(STORAGE_KEY);
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      const nextTheme = savedTheme || systemTheme;

      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;

      const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY);

      if (!hasSeenLoader) {
        window.sessionStorage.setItem(LOADER_STORAGE_KEY, "true");
        setShowLoader(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.dataset.theme = theme;
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [isMounted, theme]);

  useEffect(() => {
    if (!showLoader) return;

    const timeoutId = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 400 : LOADER_MS
    );

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion, showLoader]);

  const applyTheme = useCallback(
    (nextTheme) => {
      if (!nextTheme || nextTheme === theme) return;

      if (prefersReducedMotion) {
        setTheme(nextTheme);
        return;
      }

      const direction = nextDirectionRef.current;
      nextDirectionRef.current = direction === "ltr" ? "rtl" : "ltr";

      setTheme(nextTheme);
      applyDirectionalTheme(nextTheme, direction);
    },
    [prefersReducedMotion, theme]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme: applyTheme,
      toggleTheme: () => applyTheme(theme === "dark" ? "light" : "dark"),
    }),
    [applyTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {showLoader ? <AppLoader reducedMotion={prefersReducedMotion} /> : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}