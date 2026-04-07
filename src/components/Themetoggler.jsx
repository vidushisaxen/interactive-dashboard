"use client";
import * as React from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "motion/react";
import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppLoader from "./AppLoader";

const ThemeContext = React.createContext(null);
const STORAGE_KEY = "interactive-dashboard-theme";
const LOADER_STORAGE_KEY = "quantro-loader-seen";
const LOADER_MS = 1500;

function getSystemEffective() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getClipKeyframes(direction) {
  switch (direction) {
    case "ltr":
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
    case "rtl":
      return ["inset(0 0 0 100%)", "inset(0 0 0 0)"];
    case "ttb":
      return ["inset(0 0 100% 0)", "inset(0 0 0 0)"];
    case "btt":
      return ["inset(100% 0 0 0)", "inset(0 0 0 0)"];
    default:
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
  }
}

function getDirectionForTheme(nextTheme) {
  return nextTheme === "light" ? "ltr" : "rtl";
}

function ThemeToggler({
  theme,
  resolvedTheme,
  setTheme,
  onImmediateChange,
  direction = "ltr",
  children,
  ...props
}) {
  const [preview, setPreview] = React.useState(null);
  const [current, setCurrent] = React.useState({
    effective: theme,
    resolved: resolvedTheme,
  });

  React.useEffect(() => {
    if (
      preview &&
      theme === preview.effective &&
      resolvedTheme === preview.resolved
    ) {
      setPreview(null);
    }
  }, [theme, resolvedTheme, preview]);

  const toggleTheme = React.useCallback(
    async (theme) => {
      const resolved = theme === "system" ? getSystemEffective() : theme;
      const nextDirection =
        direction === "dynamic" ? getDirectionForTheme(resolved) : direction;
      const [fromClip, toClip] = getClipKeyframes(nextDirection);

      setCurrent({ effective: theme, resolved });
      onImmediateChange?.(theme);

      if (theme === "system" && resolved === resolvedTheme) {
        setTheme(theme);
        return;
      }

      if (!document.startViewTransition) {
        flushSync(() => {
          setPreview({ effective: theme, resolved });
        });
        setTheme(theme);
        return;
      }

      await document.startViewTransition(() => {
        flushSync(() => {
          setPreview({ effective: theme, resolved });
          document.documentElement.classList.toggle("dark", resolved === "dark");
        });
      }).ready;

      document.documentElement
        .animate(
          { clipPath: [fromClip, toClip] },
          {
            duration: 600,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
        .finished.finally(() => {
          setTheme(theme);
        });
    },
    [direction, onImmediateChange, resolvedTheme, setTheme]
  );

  return (
    <React.Fragment {...props}>
      {typeof children === "function"
        ? children({
            effective: current.effective,
            resolved: current.resolved,
            toggleTheme,
          })
        : children}
      <style>{`::view-transition-old(root), ::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
    </React.Fragment>
  );
}

function ThemeProvider({ children, direction = "dynamic" }) {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setThemeState] = React.useState("dark");
  const [showLoader, setShowLoader] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const animatingRef = React.useRef(false);
  const togglerRef = React.useRef(null);

  React.useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMounted(true);

      const savedTheme = window.sessionStorage.getItem(STORAGE_KEY) || "dark";
      setThemeState(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
      document.documentElement.classList.toggle("dark", savedTheme === "dark");

      const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY);
      if (!hasSeenLoader) {
        window.sessionStorage.setItem(LOADER_STORAGE_KEY, "true");
        setShowLoader(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  React.useEffect(() => {
    if (!showLoader) return;
    const id = window.setTimeout(
      () => setShowLoader(false),
      prefersReducedMotion ? 400 : LOADER_MS
    );
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion, showLoader]);

  const commitTheme = React.useCallback((nextTheme) => {
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.sessionStorage.setItem(STORAGE_KEY, nextTheme);
    delete document.documentElement.dataset.themeSwitching;
    animatingRef.current = false;
  }, []);

  const handleImmediateChange = React.useCallback(() => {
    animatingRef.current = true;
    document.documentElement.dataset.themeSwitching = "true";
  }, []);

  const applyTheme = React.useCallback(
    (nextTheme) => {
      if (!nextTheme || nextTheme === theme || animatingRef.current) return;

      if (prefersReducedMotion) {
        commitTheme(nextTheme);
        return;
      }

      togglerRef.current?.(nextTheme);
    },
    [commitTheme, prefersReducedMotion, theme]
  );

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: applyTheme,
      toggleTheme: () => applyTheme(theme === "dark" ? "light" : "dark"),
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
      <ThemeToggler
        theme={theme}
        resolvedTheme={theme}
        setTheme={commitTheme}
        onImmediateChange={handleImmediateChange}
        direction={direction}
      >
        {({ toggleTheme }) => {
          togglerRef.current = toggleTheme;
          return isMounted && !showLoader ? children : null;
        }}
      </ThemeToggler>

      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root) { z-index: 0; }
        ::view-transition-new(root) { z-index: 1; }
      `}</style>

      {showLoader ? <AppLoader reducedMotion={prefersReducedMotion} /> : null}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }
  return context;
}

const ThemeToggleButton = React.forwardRef(function ThemeToggleButton(
  {
    theme = "dark",
    onToggle,
    className,
    variant = "icon",
    title,
    ...props
  },
  ref
) {
  const nextLabel =
    title || (theme === "dark" ? "Switch to light mode" : "Switch to dark mode");

  return (
    <Button
      ref={ref}
      type="button"
      variant="outline"
      size={variant === "inline" ? "sm" : "icon"}
      onClick={onToggle}
      className={cn(
        variant === "inline"
          ? "h-10 rounded-lg border border-border px-3"
          : "h-11 w-11 rounded-full border border-border",
        className
      )}
      aria-label={nextLabel}
      title={nextLabel}
      {...props}
    >
      <span className="relative flex h-4.5 w-4.5 items-center justify-center overflow-hidden">
        <SunMedium
          className={cn(
            "absolute h-4.5 w-4.5 transition-all duration-300",
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
        <MoonStar
          className={cn(
            "absolute h-4.5 w-4.5 transition-all duration-300",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          )}
        />
      </span>
      {variant === "inline" ? (
        <span className="text-sm font-medium">
          {theme === "dark" ? "Dark mode" : "Light mode"}
        </span>
      ) : null}
    </Button>
  );
});

export { ThemeProvider, ThemeToggler, ThemeToggleButton, useTheme };
