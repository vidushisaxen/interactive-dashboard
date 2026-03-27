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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import AppLoader from "./AppLoader";

const ThemeContext = createContext(null);
const STORAGE_KEY = "interactive-dashboard-theme";
const LOADER_STORAGE_KEY = "quantro-loader-seen";
const THEME_SWITCH_MS = 180;
const THEME_OVERLAY_MS = 760;
const LOADER_MS = 1500;

export function ThemeProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState("dark");
  const [transitionTarget, setTransitionTarget] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState("ltr");
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutsRef = useRef([]);
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

      const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY);

      if (!hasSeenLoader) {
        window.sessionStorage.setItem(LOADER_STORAGE_KEY, "true");
        setShowLoader(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (isMounted) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [isMounted, theme]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!showLoader) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 400 : LOADER_MS
    );

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion, showLoader]);

  const clearThemeTimers = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const applyTheme = useCallback(
    (nextTheme) => {
      if (!nextTheme || nextTheme === theme) {
        return;
      }

      clearThemeTimers();

      if (prefersReducedMotion) {
        setTheme(nextTheme);
        setTransitionTarget(null);
        return;
      }

      const direction = nextDirectionRef.current;
      nextDirectionRef.current = direction === "ltr" ? "rtl" : "ltr";

      setTransitionDirection(direction);
      setTransitionTarget(nextTheme);

      timeoutsRef.current.push(
        window.setTimeout(() => {
          setTheme(nextTheme);
        }, THEME_SWITCH_MS)
      );

      timeoutsRef.current.push(
        window.setTimeout(() => {
          setTransitionTarget(null);
          timeoutsRef.current = [];
        }, THEME_OVERLAY_MS)
      );
    },
    [clearThemeTimers, prefersReducedMotion, theme]
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
      <AnimatePresence>
        {showLoader ? (
          <AppLoader key="quantro-loader" reducedMotion={prefersReducedMotion} />
        ) : null}

        {transitionTarget ? (
          <motion.div
            key={`${transitionTarget}-${transitionDirection}`}
            className="pointer-events-none fixed inset-0 z-200 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-full shadow-2xl"
              style={{
                backgroundColor:
                  transitionTarget === "dark"
                    ? "rgb(0 0 0)"
                    : "rgb(255 255 255)",
              }}
              initial={{
                x: transitionDirection === "ltr" ? "-100%" : "100%",
                opacity: 1,
                scale: 1.02,
              }}
              animate={{
                x: "0%",
                opacity: 1,
                scale: 1,
              }}
              exit={{
                x: transitionDirection === "ltr" ? "100%" : "-100%",
                opacity: 1,
                scale: 1.02,
              }}
              transition={{
                duration: 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
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
