"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { LogOut, PanelLeftIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { slideIn, smoothTween, staggerContainer } from "@/lib/animations";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoutDialog from "./LogoutDialog";
import { SIDEBAR_PRIMARY_ITEMS } from "./dashboard-data";

const EASE = [0.25, 1, 0.5, 1];
const sidebarTween = { ...smoothTween, duration: 0.28, ease: EASE };
const labelTween   = { ...smoothTween, duration: 0.22, ease: EASE };
const sidebarListVariants = staggerContainer(0.06, 0.08);
const sidebarItemVariants = slideIn("left", 18, 0.32);

// ── Single nav row: icon + label move together ────────────────────────────────
// Both halves share the same hover/active state via a single <Link> wrapper,
// so hovering anywhere on the row lights up both icon and label identically.
function NavRow({ item, active = false, expanded = false, prefersReducedMotion }) {
  const Icon = item.icon;
  const iconRef = useRef(null);

  const handleRowEnter = () => iconRef.current?.startAnimation?.();
  const handleRowLeave = () => iconRef.current?.stopAnimation?.();

  return (
    <Link
      href={item.href}
      className="group block no-underline my-2"
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
    >
      <div className="flex h-11 items-center">
        {/* Icon tile — fixed 52px, never moves */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ",
            active
              ? "border-primary bg-primary text-primary-foreground ring-1 ring-(--sidebar-active-ring) shadow-sm"
              : "border-border text-muted-foreground group-hover:bg-primary/50 group-hover:text-primary-foreground"
          )}
        >
          <Icon ref={iconRef} className="h-4 w-4 shrink-0" />
        </div>

        {/* Label — slides in/out */}
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ width: expanded ? 160 : 0, opacity: expanded ? 1 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : labelTween}
        >
          <span
            className={cn(
              "block whitespace-nowrap pl-3 text-sm font-medium transition-colors duration-200",
              active
                ? ""
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </span>
        </motion.div>
      </div>
    </Link>
  );
}

// ── Logout row (button, not link) ─────────────────────────────────────────────
function LogoutRow({ onClick, expanded = false, prefersReducedMotion }) {
  const iconRef = useRef(null);
  const handleEnter = () => iconRef.current?.startAnimation?.();
  const handleLeave = () => iconRef.current?.stopAnimation?.();

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex h-11 w-full items-center justify-start my-2 bg-transparent cursor-pointer p-0 outline-none [border:none]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-destructive transition-colors duration-200 group-hover:bg-destructive/10">
        <LogOut ref={iconRef} className="h-4 w-4 shrink-0" />
      </div>

      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ width: expanded ? 80 : 0, opacity: expanded ? 1 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : labelTween}
      >
        <span className="block text-sm font-medium text-destructive">
          Logout
        </span>
      </motion.div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const FinanceSidebar = ({ onLogout, pinned = false, onPinnedChange }) => {
  const pathname = usePathname();
  const closeTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoverReady, setHoverReady] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const isExpanded = pinned || hoverExpanded;

  useEffect(() => {
    return () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", () => setHoverReady(true), { once: true });
  }, []);

  const isActiveRoute = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleExpand = () => {
    if (pinned) return;
    if (!hoverReady) return;
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setHoverExpanded(true);
  };

  const handleCollapse = () => {
    if (pinned) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setHoverExpanded(false);
      closeTimerRef.current = null;
    }, 80);
  };

  const handleSidebarClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoverExpanded(false);
  };

  const handleTogglePinned = () => {
    const nextPinned = !pinned;
    onPinnedChange?.(nextPinned);
    if (nextPinned) {
      setHoverExpanded(false);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }
  };

  return (
    <>
      {hoverExpanded && !pinned ? (
        <motion.div
          className="fixed inset-0 z-40 bg-background/18 backdrop-blur-sm"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: EASE }}
          onClick={handleCollapse}
          aria-hidden="true"
        />
      ) : null}

      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-border backdrop-blur-md",
          "bg-[color-mix(in_srgb,var(--background)_72%,transparent)] shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
        )}
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}
        initial={
          prefersReducedMotion
            ? false
            : {
                ...slideIn("left", 26, 0.42).hidden,
                width: 72,
              }
        }
        animate={{
          width: isExpanded ? 232 : 72,
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : sidebarTween}
      >
        <ScrollArea className="h-full">
          <motion.div
            className="flex min-h-full flex-col px-2.5 py-5"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            variants={prefersReducedMotion ? undefined : sidebarListVariants}
          >

            {/* ── Logo row ── */}
            <motion.div variants={prefersReducedMotion ? undefined : sidebarItemVariants}>
              <div className="mb-8 flex items-start justify-between gap-2">
                <Link href="/" className="group flex h-11 items-center no-underline">
                  {/* Q tile */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-primary text-white shadow-sm">
                    <span className="text-base font-black">Q</span>
                  </div>

                  {/* Wordmark */}
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ width: isExpanded ? 108 : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : labelTween}
                  >
                    <div className="whitespace-nowrap pl-3">
                      <p className="text-sm font-semibold tracking-wide text-foreground">QUANTRO</p>
                      <p className="text-xs text-muted-foreground">Finance hub</p>
                    </div>
                  </motion.div>
                </Link>

                <div className={cn("flex items-center gap-2", isExpanded ? "opacity-100" : "opacity-0 pointer-events-none")}>
                  <motion.button
                    type="button"
                    onClick={handleTogglePinned}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    initial={false}
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : labelTween}
                    aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
                    aria-pressed={pinned}
                  >
                    <PanelLeftIcon
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        pinned ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* ── Nav rows ── */}
            <div className="flex flex-1 flex-col">
              {SIDEBAR_PRIMARY_ITEMS.map((item) => (
                <motion.div
                  key={item.href}
                  variants={prefersReducedMotion ? undefined : sidebarItemVariants}
                >
                  <NavRow
                    item={item}
                    active={isActiveRoute(item.href)}
                    expanded={isExpanded}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ))}
            </div>

            {/* ── Logout row ── */}
            <motion.div
              className="mt-15"
              variants={prefersReducedMotion ? undefined : sidebarItemVariants}
            >
              <LogoutRow
                onClick={() => setOpenLogout(true)}
                expanded={isExpanded}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </motion.div>
        </ScrollArea>
      </motion.aside>

      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => { setOpenLogout(false); onLogout?.(); }}
      />
    </>
  );
};

export default FinanceSidebar;
