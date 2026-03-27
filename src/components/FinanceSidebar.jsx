"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  LayoutGrid,
  BarChart3,
  Landmark,
  BriefcaseBusiness,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { smoothTween } from "@/lib/animations";

import SettingsSheet from "./SettingsSheet";
import HelpSheet from "./HelpSheet";
import LogoutDialog from "./LogoutDialog";
import { SIDEBAR_PRIMARY_ITEMS } from "./dashboard-data";

const sidebarTween = {
  ...smoothTween,
  duration: 0.52,
  ease: [0.2, 0.9, 0.2, 1],
};

const labelTween = {
  ...smoothTween,
  duration: 0.42,
  ease: [0.24, 0.92, 0.24, 1],
};

function NavItem({ item, danger = false, active = false, expanded = false }) {
  const Icon = item.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link href={item.href}>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "my-2 h-11 w-full cursor-pointer rounded-xl text-sm font-medium transition-all duration-300 ease-out",
          expanded ? "justify-start px-3" : "justify-center px-0",
          active &&
            "bg-primary text-primary-foreground ring-1 ring-(--sidebar-active-ring) shadow-sm hover:bg-primary/90 hover:text-primary-foreground",
          !active &&
            (danger
              ? "text-destructive hover:bg-destructive/10"
              : "text-muted-foreground hover:bg-primary hover:text-primary-foreground")
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <motion.span
          className="overflow-hidden text-left"
          animate={{
            marginLeft: expanded ? 12 : 0,
            maxWidth: expanded ? 132 : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : labelTween
          }
        >
          <span className="min-w-0 overflow-hidden whitespace-nowrap">
            {item.label}
          </span>
        </motion.span>
      </Button>
    </Link>
  );
}

function ActionItem({ icon: Icon, label, onClick, danger = false, expanded = false }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-11 w-full cursor-pointer rounded-xl text-sm font-medium transition-all duration-300 ease-out",
        expanded ? "justify-start px-3" : "justify-center px-0",
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-muted-foreground hover:bg-primary hover:text-primary-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <motion.span
        className="overflow-hidden text-left"
        animate={{
          marginLeft: expanded ? 12 : 0,
          maxWidth: expanded ? 132 : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : labelTween
        }
      >
        <span className="min-w-0 overflow-hidden whitespace-nowrap">{label}</span>
      </motion.span>
    </Button>
  );
}

const FinanceSidebar = ({ expanded = false, onExpandedChange, onLogout }) => {
  const pathname = usePathname();
  const closeTimerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoverReady, setHoverReady] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    onExpandedChange?.(false);

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [onExpandedChange]);

  useEffect(() => {
    const enableHover = () => {
      setHoverReady(true);
      window.removeEventListener("mousemove", enableHover);
    };

    window.addEventListener("mousemove", enableHover, { once: true });

    return () => {
      window.removeEventListener("mousemove", enableHover);
    };
  }, []);

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleExpand = () => {
    if (!hoverReady) {
      return;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    onExpandedChange?.(true);
  };

  const handleCollapse = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      onExpandedChange?.(false);
      closeTimerRef.current = null;
    }, 240);
  };

  return (
    <>
      <motion.aside
        className="fixed left-0 top-0 z-50 h-screen border-r border-border/60 bg-background/95 backdrop-blur-xl"
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}
        animate={{ width: expanded ? 240 : 88 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : sidebarTween
        }
      >
        <motion.div
          className="flex h-full flex-col py-5"
          animate={{
            paddingLeft: expanded ? 16 : 12,
            paddingRight: expanded ? 16 : 12,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : sidebarTween
          }
        >
          <div className="mb-4">
            <Link href="/">
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full cursor-pointer rounded-2xl py-2 transition-all duration-300 ease-out hover:bg-transparent",
                  expanded ? "justify-start px-2" : "justify-center px-2"
                )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                      <span className="text-base font-black">Q</span>
                    </div>
                    <motion.div
                      className="min-w-0 overflow-hidden text-left"
                      animate={{
                        marginLeft: expanded ? 0 : 0,
                        maxWidth: expanded ? 140 : 0,
                        opacity: expanded ? 1 : 0,
                      }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : labelTween
                      }
                    >
                      <div className="min-w-0 overflow-hidden whitespace-nowrap">
                      <p className="text-sm font-semibold tracking-wide">
                        QUANTRO
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Finance hub
                      </p>
                    </div>
                    </motion.div>
                  </div>
              </Button>
            </Link>
          </div>

          <Separator className="mb-4" />

          <ScrollArea className="flex-1">
            <div className={cn("space-y-2", expanded ? "pr-2" : "pr-1")}>
              {SIDEBAR_PRIMARY_ITEMS.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  active={isActiveRoute(item.href)}
                  expanded={expanded}
                />
              ))}
            </div>
          </ScrollArea>

          <Separator className="my-4" />

          <div className="space-y-2">
            <ActionItem
              icon={Settings}
              label="Settings"
              onClick={() => setOpenSettings(true)}
              expanded={expanded}
            />

            <ActionItem
              icon={CircleHelp}
              label="Help"
              onClick={() => setOpenHelp(true)}
              expanded={expanded}
            />

            <ActionItem
              icon={LogOut}
              label="Logout"
              danger
              onClick={() => setOpenLogout(true)}
              expanded={expanded}
            />
          </div>
        </motion.div>
      </motion.aside>

      <SettingsSheet open={openSettings} onOpenChange={setOpenSettings} />
      <HelpSheet open={openHelp} onOpenChange={setOpenHelp} />
      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => {
          setOpenLogout(false);
          onLogout?.();
        }}
      />
    </>
  );
};

export default FinanceSidebar;
