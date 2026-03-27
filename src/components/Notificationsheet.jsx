"use client";

import { useMemo, useState } from "react";
import {
  CheckCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import SidePanel from "./SidePanel";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";
import { NOTIFICATION_ITEMS } from "./dashboard-data";

const NotificationsSheet = ({ open, onOpenChange }) => {
  const [notifications, setNotifications] = useState(NOTIFICATION_ITEMS);
  const [activeId, setActiveId] = useState(NOTIFICATION_ITEMS[0]?.id ?? null);
  const unreadCount = notifications.filter((item) => item.unread).length;
  const activeNotification = useMemo(
    () => notifications.find((item) => item.id === activeId) ?? notifications[0],
    [activeId, notifications]
  );

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Notifications"
      subtitle="Your latest account updates and alerts"
    >
      <div className="space-y-6">
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal y={14} blur="6px" duration={0.45}>
                <p className="text-sm font-medium">Inbox</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={14}
                blur="6px"
                duration={0.45}
                delay={0.05}
              >
                <p className="text-xs text-muted-foreground">
                  Stay updated with account activity and reports.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08} duration={0.4}>
              <Badge variant="secondary" className="rounded-full">
                {unreadCount} New
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.5} delay={0.06}>
          <div className="flex items-center justify-between">
            <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Recent updates
              </p>
            </AnimatedTextReveal>

            <AnimatedFadeUp delay={0.08} duration={0.35}>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((item) => ({ ...item, unread: false }))
                  )
                }
                className="rounded-xl cursor-pointer"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark all
              </Button>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        {activeNotification ? (
          <AnimatedSlideIn direction="right" duration={0.45} delay={0.08}>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              <p className="text-sm font-medium">{activeNotification.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeNotification.text}
              </p>
            </div>
          </AnimatedSlideIn>
        ) : null}

        <AnimatedSlideIn direction="up" duration={0.4} delay={0.1}>
          <Separator />
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.55} delay={0.12}>
          <ScrollArea className="h-105 pr-2">
            <div className="space-y-4">
              {notifications.map((item, index) => {
                const Icon = item.icon;

                return (
                  <AnimatedSlideIn
                    key={item.id}
                    direction="right"
                    duration={0.45}
                    delay={0.14 + index * 0.05}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(item.id);
                        markAsRead(item.id);
                      }}
                      className="w-full rounded-2xl cursor-pointer border border-border/60 bg-background/60 p-4 text-left transition-colors hover:bg-accent/40"
                    >
                      <div className="flex gap-3">
                        <AnimatedFadeUp delay={0.02} duration={0.35}>
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                        </AnimatedFadeUp>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <AnimatedTextReveal
                                y={10}
                                blur="4px"
                                duration={0.35}
                              >
                                <p className="text-base font-medium">
                                  {item.title}
                                </p>
                              </AnimatedTextReveal>

                              {item.unread && (
                                <AnimatedFadeUp delay={0.04} duration={0.3}>
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                </AnimatedFadeUp>
                              )}
                            </div>

                            <AnimatedTextReveal
                              y={10}
                              blur="4px"
                              duration={0.35}
                              delay={0.03}
                            >
                              <span className="shrink-0 text-xs text-muted-foreground">
                                {item.time}
                              </span>
                            </AnimatedTextReveal>
                          </div>

                          <AnimatedTextReveal
                            y={10}
                            blur="4px"
                            duration={0.35}
                            delay={0.05}
                          >
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.text}
                            </p>
                          </AnimatedTextReveal>
                        </div>
                      </div>
                    </button>
                  </AnimatedSlideIn>
                );
              })}
            </div>
          </ScrollArea>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

export default NotificationsSheet;
