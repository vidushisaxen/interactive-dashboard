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
import { flushSync } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import AppLoader from "./AppLoader";

const ThemeContext = createContext(null);
const STORAGE_KEY = "interactive-dashboard-theme";
const LOADER_STORAGE_KEY = "quantro-loader-seen";
const LOADER_MS = 1500;

// easeOutQuart — quick pop, smooth tail
const RIPPLE_EASE = [0.5, 1, 0.8, 1];
const RIPPLE_DURATION = 0.5;

function getMaskRadius(x, y) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.ceil(
    Math.max(
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y)
    )
  );
}

// ─── Motion ripple overlay ────────────────────────────────────────────────────
function RippleOverlay({ origin, color, onComplete }) {
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const r = getMaskRadius(x, y);
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scale: 0.02, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: RIPPLE_DURATION, ease: RIPPLE_EASE }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        zIndex: 100,
        pointerEvents: "none",
        backgroundColor: color,
        borderRadius: "9999px",
        willChange: "transform",
      }}
    />
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const [theme, setThemeState] = useState("dark");
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ripple state: null = idle, object = animating
  const [ripple, setRipple] = useState(null);
  const animatingRef = useRef(false);
  const isFirstRender = useRef(true);
  const rippleThemeSwapTimeoutRef = useRef(null);

  // ── Hydrate from storage ───────────────────────────────────────────────────
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);

      const savedTheme = window.sessionStorage.getItem(STORAGE_KEY);
      const nextTheme = savedTheme || "dark";

      setThemeState(nextTheme);
      document.documentElement.dataset.theme = nextTheme;

      const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY);
      if (!hasSeenLoader) {
        window.sessionStorage.setItem(LOADER_STORAGE_KEY, "true");
        setShowLoader(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // ── Persist theme (skip on first hydration render) ────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.documentElement.dataset.theme = theme;
    window.sessionStorage.setItem(STORAGE_KEY, theme);
  }, [isMounted, theme]);

  // ── Loader auto-dismiss ───────────────────────────────────────────────────
  useEffect(() => {
    if (!showLoader) return;
    const id = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 400 : LOADER_MS
    );
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion, showLoader]);

  // ── Ripple complete: hide overlay, unlock ─────────────────────────────────
  const handleRippleComplete = useCallback(() => {
    if (rippleThemeSwapTimeoutRef.current) {
      window.clearTimeout(rippleThemeSwapTimeoutRef.current);
      rippleThemeSwapTimeoutRef.current = null;
    }
    setRipple(null);
    animatingRef.current = false;
  }, []);

  useEffect(
    () => () => {
      if (rippleThemeSwapTimeoutRef.current) {
        window.clearTimeout(rippleThemeSwapTimeoutRef.current);
      }
    },
    []
  );

  // ── View Transition path ──────────────────────────────────────────────────
  const runViewTransitionAnimation = useCallback(
    (nextTheme, origin) => {
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const radius = getMaskRadius(x, y);

      animatingRef.current = true;

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setThemeState(nextTheme);
          document.documentElement.dataset.theme = nextTheme;
        });
      });

      transition.ready
        .then(() => {
          document.documentElement
            .animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${radius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: RIPPLE_DURATION * 1000,
                easing: `cubic-bezier(${RIPPLE_EASE.join(",")})`,
                pseudoElement: "::view-transition-new(root)",
              }
            )
            .finished.finally(() => {
              window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
              animatingRef.current = false;
            });
        })
        .catch(() => {
          // Fall through to Motion ripple
          animatingRef.current = false;
          runMotionRipple(nextTheme, origin);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ── Motion ripple path (fallback / explicit) ──────────────────────────────
  const runMotionRipple = useCallback((nextTheme, origin) => {
    const overlayColor = nextTheme === "dark" ? "#09090b" : "#f8fafc";

    animatingRef.current = true;

    // Mount the overlay first, then swap the theme once the screen is mostly covered.
    setRipple({ origin, color: overlayColor, nextTheme });

    rippleThemeSwapTimeoutRef.current = window.setTimeout(() => {
      setThemeState(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
      rippleThemeSwapTimeoutRef.current = null;
    }, RIPPLE_DURATION * 1000 * 0.42);
  }, []);

  // ── Main applyTheme ───────────────────────────────────────────────────────
  const applyTheme = useCallback(
    (nextTheme, origin) => {
      if (!nextTheme || nextTheme === theme || animatingRef.current) return;

      if (prefersReducedMotion) {
        setThemeState(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
        return;
      }

      if (typeof document !== "undefined" && document.startViewTransition) {
        runViewTransitionAnimation(nextTheme, origin);
        return;
      }

      runMotionRipple(nextTheme, origin);
    },
    [prefersReducedMotion, runMotionRipple, runViewTransitionAnimation, theme]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme: applyTheme,
      toggleTheme: (origin) =>
        applyTheme(theme === "dark" ? "light" : "dark", origin),
      resetTheme: () => {
        setThemeState("dark");
        document.documentElement.dataset.theme = "dark";
        window.sessionStorage.removeItem(STORAGE_KEY);
      },
    }),
    [applyTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {isMounted && !showLoader ? children : null}

      {ripple && (
        <RippleOverlay
          key={ripple.nextTheme}
          origin={ripple.origin}
          color={ripple.color}
          onComplete={handleRippleComplete}
        />
      )}

      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}</style>

      {showLoader ? <AppLoader reducedMotion={prefersReducedMotion} /> : null}
    </ThemeContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider.");
  return context;
}
