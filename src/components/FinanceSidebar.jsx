"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { LogOut } from "lucide-react";
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

  return (
    <Link href={item.href} className="group block no-underline my-2">
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
          <Icon className="h-4 w-4 shrink-0" />
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
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-11 w-full items-center justify-start my-2 bg-transparent cursor-pointer p-0 outline-none [border:none]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-destructive transition-colors duration-200 group-hover:bg-destructive/10">
        <LogOut className="h-4 w-4 shrink-0" />
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

const FinanceSidebar = ({ expanded = false, onExpandedChange, onLogout }) => {
  const pathname = usePathname();
  const closeTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoverReady, setHoverReady] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    onExpandedChange?.(false);
    return () => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); };
  }, [onExpandedChange]);

  useEffect(() => {
    window.addEventListener("mousemove", () => setHoverReady(true), { once: true });
  }, []);

  const isActiveRoute = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleExpand = () => {
    if (!hoverReady) return;
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    onExpandedChange?.(true);
  };

  const handleCollapse = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      onExpandedChange?.(false);
      closeTimerRef.current = null;
    }, 80);
  };

  return (
    <>
      <motion.aside
        className="fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-border bg-background/95 backdrop-blur-xl"
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
          width: expanded ? 232 : 72,
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
              <Link href="/" className="group mb-8 flex h-11 items-center no-underline">
                {/* Q tile */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-primary text-white shadow-sm">
                  <span className="text-base font-black">Q</span>
                </div>

                {/* Wordmark */}
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ width: expanded ? 160 : 0, opacity: expanded ? 1 : 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : labelTween}
                >
                  <div className="whitespace-nowrap pl-3">
                    <p className="text-sm font-semibold tracking-wide text-foreground">QUANTRO</p>
                    <p className="text-xs text-muted-foreground">Finance hub</p>
                  </div>
                </motion.div>
              </Link>
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
                    expanded={expanded}
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
                expanded={expanded}
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
