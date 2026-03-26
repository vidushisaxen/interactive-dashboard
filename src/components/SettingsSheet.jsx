"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CreditCard,
  Globe,
  Lock,
  MoonStar,
  ShieldCheck,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import SidePanel from "./SidePanel";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";

const settingsGroups = [
  {
    title: "Preferences",
    items: [
      { icon: MoonStar, label: "Appearance", key: "appearance", kind: "toggle" },
      { icon: Globe, label: "Language", key: "language", kind: "choice" },
      { icon: Bell, label: "Notifications", key: "notifications", kind: "toggle" },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: Lock, label: "Password", key: "password", kind: "choice" },
      { icon: ShieldCheck, label: "2FA", key: "twoFactor", kind: "toggle" },
      { icon: CreditCard, label: "Payment Methods", key: "payments", kind: "choice" },
    ],
  },
];

const SettingsSheet = ({ open, onOpenChange }) => {
  const [settings, setSettings] = useState({
    appearance: false,
    language: "English",
    notifications: true,
    password: "Updated 14 days ago",
    twoFactor: true,
    payments: "3 linked",
  });
  const [lastSaved, setLastSaved] = useState(
    "Everything is synced to your workspace."
  );

  const cycleSetting = (key) => {
    const options = {
      language: ["English", "Spanish", "French"],
      password: ["Updated 14 days ago", "Reset available", "Needs review"],
      payments: ["3 linked", "4 linked", "1 primary card"],
    };
    const values = options[key];
    if (!values) return;

    setSettings((prev) => {
      const currentIndex = values.indexOf(prev[key]);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % values.length;

      return {
        ...prev,
        [key]: values[nextIndex],
      };
    });
  };

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Settings"
      subtitle="Manage preferences, security, and account controls"
      width="w-[460px]"
    >
      <div className="space-y-6">
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal y={14} blur="6px" duration={0.45}>
                <p className="text-sm font-medium">Workspace settings</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={14}
                blur="6px"
                duration={0.45}
                delay={0.05}
              >
                <p className="text-xs text-muted-foreground">
                  Review preferences, security, and linked payment methods.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08} duration={0.45}>
              <Badge variant="secondary" className="rounded-full">
                Secure
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.48} delay={0.05}>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">Workspace status</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {lastSaved}
            </p>
          </div>
        </AnimatedSlideIn>

        {settingsGroups.map((group, index) => (
          <AnimatedSlideIn
            key={group.title}
            direction="right"
            duration={0.55}
            delay={0.08 + index * 0.08}
          >
            <div className="space-y-3">
              {index > 0 && <Separator />}

              <div className="flex items-center justify-between">
                <AnimatedTextReveal y={12} blur="5px" duration={0.4}>
                  <h3 className="text-base font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </AnimatedTextReveal>

                <AnimatedTextReveal
                  y={12}
                  blur="5px"
                  duration={0.4}
                  delay={0.04}
                >
                  <span className="text-xs text-muted-foreground">
                    {group.items.length} items
                  </span>
                </AnimatedTextReveal>
              </div>

              <div className="space-y-3">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;

                  return (
                    <AnimatedSlideIn
                      key={item.label}
                      direction="right"
                      duration={0.45}
                      delay={0.1 + itemIndex * 0.05}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item.kind === "choice") {
                            cycleSetting(item.key);
                          } else {
                            setSettings((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }));
                          }
                        }}
                        className="flex w-full items-center cursor-pointer justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-left transition-colors hover:bg-accent/40"
                      >
                        <div className="flex items-center gap-3">
                          <AnimatedFadeUp delay={0.02 * itemIndex} duration={0.4}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          </AnimatedFadeUp>

                          <div className="space-y-0.5">
                            <AnimatedTextReveal
                              y={10}
                              blur="4px"
                              duration={0.35}
                            >
                              <div className="text-sm font-medium">
                                {item.label}
                              </div>
                            </AnimatedTextReveal>

                            <AnimatedTextReveal
                              y={10}
                              blur="4px"
                              duration={0.35}
                              delay={0.04}
                            >
                              <div className="text-xs text-muted-foreground">
                                {item.kind === "toggle"
                                  ? settings[item.key]
                                    ? "Enabled"
                                    : "Disabled"
                                  : settings[item.key]}
                              </div>
                            </AnimatedTextReveal>
                          </div>
                        </div>

                        <AnimatedFadeUp delay={0.05} duration={0.35}>
                          {item.kind === "toggle" ? (
                            <Switch
                              checked={settings[item.key]}
                              onCheckedChange={(checked) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  [item.key]: checked,
                                }))
                              }
                              onClick={(event) => event.stopPropagation()}
                            />
                          ) : (
                            <span className="inline-flex h-8 items-center rounded-xl border border-border/60 px-3 text-xs font-medium text-primary">
                              Edit
                            </span>
                          )}
                        </AnimatedFadeUp>
                      </button>
                    </AnimatedSlideIn>
                  );
                })}
              </div>
            </div>
          </AnimatedSlideIn>
        ))}

        <AnimatedSlideIn direction="up" duration={0.45} delay={0.2}>
          <Separator />
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" duration={0.5} delay={0.24}>
          <div className="flex justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-2xl cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            <Button
              type="button"
              onClick={() =>
                setLastSaved(
                  `Saved ${settings.language} preferences with ${
                    settings.notifications ? "notifications on" : "notifications muted"
                  }.`
                )
              }
              className="rounded-2xl cursor-pointer"
            >
              <Check className="mr-2 h-4 w-4" />
              Save changes
            </Button>
          </div>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

export default SettingsSheet;
