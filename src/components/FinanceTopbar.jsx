"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  ChevronDown,
  MoonStar,
  Search,
  SunMedium,
  User,
  Settings,
  CircleHelp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import NotificationsSheet from "./Notificationsheet";
import ProfileSheet from "./ProfileSheet";
import { SEARCH_TERMS } from "./dashboard-data";
import SettingsSheet from "./SettingsSheet";
import HelpSheet from "./HelpSheet";

const searchDropdownVariants = {
  hidden: {
    opacity: 0,
    y: -6,
    scale: 0.985,
    transformOrigin: "top center",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.99,
    transition: {
      duration: 0.12,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

const searchItemVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.16,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 3,
    transition: {
      duration: 0.1,
    },
  },
};

const FinanceTopbar = ({
  onNav,
  theme = "dark",
  onToggleTheme,
  searchValue = "",
  onSearchChange,
  userName = "",
}) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const searchSuggestions = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    if (!normalized) {
      return SEARCH_TERMS.slice(0, 6);
    }

    return SEARCH_TERMS.filter((term) =>
      term.toLowerCase().includes(normalized)
    ).slice(0, 6);
  }, [searchValue]);

  const displayName = useMemo(() => {
    const trimmed = userName.trim();
    if (!trimmed) return "there";

    const [firstWord] = trimmed.split(/\s+/);
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }, [userName]);

  const userInitials = useMemo(() => {
    const segments = userName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);

    if (!segments.length) return "U";

    return segments
      .map((segment) => segment.charAt(0).toUpperCase())
      .join("");
  }, [userName]);

  const handleProfileAction = (action) => {
    setProfileMenuOpen(false);

    if (action === "profile") {
      setOpenProfile(true);
      return;
    }

    onNav?.(action);
  };

  const handleThemeToggle = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    onToggleTheme?.({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <>
      <TooltipProvider delayDuration={120}>
        <header className="sticky top-0 z-40 flex h-21 items-center justify-between bg-background/80 px-6 backdrop-blur supports-backdrop-filter:bg-background/70 lg:px-8">
          <div className="min-w-0 pr-6 pt-3">
            <h1 className="truncate text-[1.9rem] font-semibold tracking-tight text-foreground">
              Good to see you, {displayName}!
            </h1>
            <p className="mt-2 truncate text-sm text-muted-foreground">
              Improve your finance management for better growth
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search accounts, spending, transactions..."
                value={searchValue}
                onChange={(event) => onSearchChange?.(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => {
                  window.setTimeout(() => setSearchFocused(false), 120);
                }}
                className="h-11 w-80 rounded-lg pl-10"
              />

              <AnimatePresence>
                {searchFocused && searchSuggestions.length ? (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={searchDropdownVariants}
                    className="absolute left-0 top-[calc(100%+10px)] z-50 w-full rounded-lg border border-border bg-popover/96 p-2 shadow-lg backdrop-blur"
                  >
                    <motion.p
                      variants={searchItemVariants}
                      className="px-2 pb-2 pt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground"
                    >
                      Related terms
                    </motion.p>

                    <div className="space-y-1">
                      {searchSuggestions.map((term) => (
                        <motion.div key={term} variants={searchItemVariants}>
                          <button
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              onSearchChange?.(term);
                              setSearchFocused(false);
                            }}
                            className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            <Search className="mr-2 h-3.5 w-3.5 shrink-0" />
                            {term}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setOpenNotifications(true)}
                  className="relative h-11 w-11 cursor-pointer rounded-full border border-border"
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute right-1 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background animate-pulse" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

           <Tooltip>
  <TooltipTrigger asChild>
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      className="h-11 w-11 cursor-pointer rounded-full"
    >
      <span className="relative flex h-4.5 w-4.5 items-center justify-center overflow-hidden">
        <SunMedium
          className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <MoonStar
          className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  </TooltipContent>
</Tooltip>
            <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-2 h-11 rounded-lg border border-border bg-background/80 px-3 text-foreground transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-white text-xs font-bold text-primary">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown
                    className={`ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-56 rounded-lg border border-border bg-popover/95 p-2 shadow-lg backdrop-blur"
              >
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-2"
                >
                  <div className="rounded-lg border border-border bg-background/70 p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm font-bold">
                          JK
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          James Kole
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          james@quantro.finance
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem
                    onClick={() => {
                      setProfileMenuOpen(false);
                      handleProfileAction("profile");
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Open profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setOpenSettings(true);
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setOpenHelp(true);
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2"
                  >
                    <CircleHelp className="mr-2 h-4 w-4" />
                    Help
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </TooltipProvider>

      <SettingsSheet open={openSettings} onOpenChange={setOpenSettings} />
      <HelpSheet open={openHelp} onOpenChange={setOpenHelp} />

      <NotificationsSheet
        open={openNotifications}
        onOpenChange={setOpenNotifications}
      />

      <ProfileSheet
        open={openProfile}
        onOpenChange={setOpenProfile}
      />
    </>
  );
};

export default FinanceTopbar;
