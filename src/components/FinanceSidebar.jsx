"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BarChart3,
  Landmark,
  BriefcaseBusiness,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import SettingsSheet from "./SettingsSheet";
import HelpSheet from "./HelpSheet";
import LogoutDialog from "./LogoutDialog";

const primaryItems = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Insights", icon: BarChart3, href: "/analytics" },
  { label: "Accounts", icon: Landmark, href: "/pools" },
  { label: "Portfolio", icon: BriefcaseBusiness, href: "/overview" },
  { label: "Add Funds", icon: ArrowDownToLine, href: "/deposit" },
  { label: "Cash Out", icon: ArrowUpFromLine, href: "/withdraw" },
];

function NavItem({ item, danger = false, active = false }) {
  const Icon = item.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={item.href}>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "my-2 h-10 w-full cursor-pointer justify-center rounded-lg px-0 text-sm font-medium transition-all",
              active &&
                "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/30 hover:bg-orange-500/25 hover:text-orange-300",
              !active &&
                (danger
                  ? "text-destructive hover:bg-destructive/10"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground")
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

function ActionItem({ icon: Icon, label, onClick, danger = false }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          onClick={onClick}
          className={cn(
            "h-10 w-full cursor-pointer justify-center rounded-lg px-0 text-sm font-medium transition-all",
            danger
              ? "text-destructive hover:bg-destructive/10"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

const FinanceSidebar = () => {
  const pathname = usePathname();

  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <TooltipProvider delayDuration={120}>
        <aside className="fixed left-0 top-0 z-50 h-screen w-22 border-r border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="flex h-full flex-col px-3 py-5">
            <div className="mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="h-auto w-full justify-center cursor-pointer rounded-2xl px-2 py-2 hover:bg-transparent"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <span className="text-base font-black">T</span>
                      </div>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">TRADERLY</TooltipContent>
              </Tooltip>
            </div>

            <Separator className="mb-4" />

            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-1">
                {primaryItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    active={isActiveRoute(item.href)}
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
              />

              <ActionItem
                icon={CircleHelp}
                label="Help"
                onClick={() => setOpenHelp(true)}
              />

              <ActionItem
                icon={LogOut}
                label="Logout"
                danger
                onClick={() => setOpenLogout(true)}
              />
            </div>
          </div>
        </aside>
      </TooltipProvider>

      <SettingsSheet open={openSettings} onOpenChange={setOpenSettings} />
      <HelpSheet open={openHelp} onOpenChange={setOpenHelp} />
      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => setOpenLogout(false)}
      />
    </>
  );
};

export default FinanceSidebar;