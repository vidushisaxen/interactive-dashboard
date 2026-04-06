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

// easeOutQuart — quick pop, smooth tail (used for Motion ripple fallback)
// const RIPPLE_EASE = [0.5, 1, 0.8, 1];
const RIPPLE_EASE = [1,1,1,1];
const RIPPLE_DURATION = 1.5;

function getClipKeyframes(direction) {
  switch (direction) {
    case "rtl":
      return ["inset(0 0 0 100%)", "inset(0 0 0 0)"];
    case "ttb":
      return ["inset(0 0 100% 0)", "inset(0 0 0 0)"];
    case "btt":
      return ["inset(100% 0 0 0)", "inset(0 0 0 0)"];
    case "ltr":
    default:
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
  }
}

function getDirectionForTheme(nextTheme) {
  return nextTheme === "light" ? "ltr" : "rtl";
}

// ─── Radial ripple geometry (used only by Motion fallback) ───────────────────
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

// ─── Motion ripple overlay (fallback when no startViewTransition) ─────────────
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
/**
 * @param {{ children: React.ReactNode, direction?: 'ltr'|'rtl'|'ttb'|'btt' }} props
 *   direction – wipe direction for the view-transition animation (default: 'ltr')
 */
export function ThemeProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const [theme, setThemeState] = useState("dark");
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ripple state: null = idle, object = animating (Motion fallback only)
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

  // ── Ripple complete: hide overlay, unlock (Motion fallback only) ──────────
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

  const runViewTransitionAnimation = useCallback(
    async (nextTheme) => {
      animatingRef.current = true;

      const [fromClip, toClip] = getClipKeyframes(
        getDirectionForTheme(nextTheme)
      );

      try {
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setThemeState(nextTheme);
            document.documentElement.dataset.theme = nextTheme;
          });
        });

        await transition.ready;

        await document.documentElement
          .animate(
            { clipPath: [fromClip, toClip] },
            {
              duration: 700,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          )
          .finished;

        window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        setThemeState(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
      }

      animatingRef.current = false;
    },
    []
  );

  // ── Motion ripple path (fallback when startViewTransition unavailable) ────
  const runMotionRipple = useCallback((nextTheme, origin) => {
    const overlayColor = nextTheme === "dark" ? "#09090b" : "#f8fafc";

    animatingRef.current = true;

    setRipple({ origin, color: overlayColor, nextTheme });

    rippleThemeSwapTimeoutRef.current = window.setTimeout(() => {
      setThemeState(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
      rippleThemeSwapTimeoutRef.current = null;
    }, RIPPLE_DURATION * 1000 * 0.42);
  }, []);

  // ── Main applyTheme ───────────────────────────────────────────────────────
  /**
   * @param {string} nextTheme
   * @param {{ x: number, y: number } | null} [origin]
   *   origin is kept for API compatibility and used by the Motion ripple
   *   fallback; the view-transition wipe ignores it (it's directional, not
   *   origin-based).
   */
  const applyTheme = useCallback(
    (nextTheme, origin) => {
      if (!nextTheme || nextTheme === theme || animatingRef.current) return;

      // Respect prefers-reduced-motion: instant swap, no animation
      if (prefersReducedMotion) {
        setThemeState(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
        return;
      }

      if (typeof document !== "undefined" && document.startViewTransition) {
        runViewTransitionAnimation(nextTheme);
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

      {/* Motion ripple overlay — only rendered when startViewTransition is absent */}
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
        ::view-transition-new(root) {
          z-index: 1;
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
