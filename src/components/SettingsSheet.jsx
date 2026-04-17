"use client";

import { useRef, useState } from "react";
import {
  Check,
  X,
} from "@/components/icons";
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
import { useTheme } from "./Themetoggler";
import { ThemeToggleButton } from "./Themetoggler";
import { SETTINGS_CHOICE_OPTIONS, SETTINGS_GROUPS } from "./dashboard-data";

const SettingsSheet = ({ open, onOpenChange }) => {
  const { theme, toggleTheme } = useTheme();
  const closeIconRef = useRef(null);
  const saveIconRef = useRef(null);
  const [settings, setSettings] = useState({
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
    const values = SETTINGS_CHOICE_OPTIONS[key];
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

  const handleToggle = (key, checked) => {
    if (key === "appearance") {
      toggleTheme();
      return;
    }

    setSettings((prev) => ({
      ...prev,
      [key]: Boolean(checked),
    }));
  };

  const getSettingValue = (key) =>
    key === "appearance" ? theme === "dark" : settings[key];

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
          <div className="flex items-center justify-between rounded-lg border  border border-border bg-muted/30 p-4">
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
              <Badge variant="secondary">
                Secure
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.48} delay={0.05}>
          <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">Workspace status</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {lastSaved}
            </p>
          </div>
        </AnimatedSlideIn>

        {SETTINGS_GROUPS.map((group, index) => (
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

                  const isToggle = item.kind === "toggle";

                  const rowClassName =
                    "flex w-full items-center justify-between rounded-lg border  border border-border bg-background/60 px-4 py-3 text-left transition-colors hover:bg-accent/40";

                  const rowContent = (
                    <>
                      <div className="flex items-center gap-3">
                        <AnimatedFadeUp delay={0.02 * itemIndex} duration={0.4}>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
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
                              {isToggle
                                ? getSettingValue(item.key)
                                  ? "Enabled"
                                  : "Disabled"
                                : settings[item.key]}
                            </div>
                          </AnimatedTextReveal>
                        </div>
                      </div>

                      <AnimatedFadeUp delay={0.05} duration={0.35}>
                        {isToggle ? (
                          item.key === "appearance" ? (
                            <ThemeToggleButton
                              theme={theme}
                              onToggle={(event) => {
                                event.stopPropagation();
                                toggleTheme();
                              }}
                              variant="inline"
                              className="h-9"
                            />
                          ) : (
                            <Switch
                              checked={getSettingValue(item.key)}
                              onCheckedChange={(checked) =>
                                handleToggle(item.key, checked)
                              }
                              onClick={(event) => event.stopPropagation()}
                            />
                          )
                        ) : (
                          <span className="inline-flex h-8 items-center rounded-lg border  border border-border px-3 text-xs font-medium text-primary">
                            Edit
                          </span>
                        )}
                      </AnimatedFadeUp>
                    </>
                  );

                  return (
                    <AnimatedSlideIn
                      key={item.label}
                      direction="right"
                      duration={0.45}
                      delay={0.1 + itemIndex * 0.05}
                    >
                      {isToggle ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            handleToggle(item.key, !getSettingValue(item.key))
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleToggle(item.key, !getSettingValue(item.key));
                            }
                          }}
                          className={`${rowClassName} cursor-pointer`}
                        >
                          {rowContent}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => cycleSetting(item.key)}
                          className={`${rowClassName} cursor-pointer`}
                        >
                          {rowContent}
                        </button>
                      )}
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
              onMouseEnter={() => closeIconRef.current?.startAnimation?.()}
              onMouseLeave={() => closeIconRef.current?.stopAnimation?.()}
              className="rounded-lg cursor-pointer"
            >
              <X ref={closeIconRef} className="mr-2 h-4 w-4" />
              Close
            </Button>

            <Button
              type="button"
              onClick={() => {
                setLastSaved(
                  `Saved ${settings.language} preferences with ${
                    settings.notifications ? "notifications on" : "notifications muted"
                  }.`
                );
                onOpenChange(false);
              }}
              onMouseEnter={() => saveIconRef.current?.startAnimation?.()}
              onMouseLeave={() => saveIconRef.current?.stopAnimation?.()}
              className="rounded-lg cursor-pointer"
            >
              <Check ref={saveIconRef} className="mr-2 h-4 w-4" />
              Save changes
            </Button>
          </div>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

export default SettingsSheet;
