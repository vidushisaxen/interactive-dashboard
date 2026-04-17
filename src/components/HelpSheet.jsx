"use client";

import { useRef, useState } from "react";
import {
  ExternalLink,
} from "@/components/icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import SidePanel from "./SidePanel";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";
import { HELP_ITEMS } from "./dashboard-data";

const HelpActionButton = ({ variant, onClick, children }) => {
  const iconRef = useRef(null);

  return (
    <Button
      size="sm"
      variant={variant}
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.startAnimation?.()}
      onMouseLeave={() => iconRef.current?.stopAnimation?.()}
      className="rounded-lg cursor-pointer"
    >
      {children}
      <ExternalLink ref={iconRef} className="ml-2 h-3.5 w-3.5" />
    </Button>
  );
};

const HelpSheet = ({ open, onOpenChange }) => {
  const [activeItem, setActiveItem] = useState(HELP_ITEMS[1]);

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Help & Support"
      subtitle="Get assistance, documentation, and contact options"
      width="w-[460px]"
    >
      <div className="space-y-6">
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-lg border  border border-border bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal y={14} blur="6px" duration={0.45}>
                <p className="text-sm font-medium">Support Hub</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={14}
                blur="6px"
                duration={0.45}
                delay={0.05}
              >
                <p className="text-xs text-muted-foreground">
                  Choose the fastest way to get help.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08} duration={0.4}>
              <Badge variant="secondary" className="rounded-full">
                24/7
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" duration={0.4} delay={0.08}>
          <Separator />
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.45} delay={0.1}>
          <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">{activeItem.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {activeItem.text}
            </p>
          </div>
        </AnimatedSlideIn>

        <div className="space-y-4">
          {HELP_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isPrimary = item.tone === "primary";

            return (
              <AnimatedSlideIn
                key={item.title}
                direction="right"
                duration={0.45}
                delay={0.1 + index * 0.05}
              >
                <div className="flex items-center justify-between rounded-lg border  border border-border bg-background/60 p-4 transition-colors hover:bg-accent/40">
                  <div className="flex min-w-0 items-center gap-3">
                    <AnimatedFadeUp delay={0.02} duration={0.35}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </AnimatedFadeUp>

                    <div className="min-w-0 space-y-0.5">
                      <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
                        <div className="text-base font-medium">{item.title}</div>
                      </AnimatedTextReveal>

                      <AnimatedTextReveal
                        y={10}
                        blur="4px"
                        duration={0.35}
                        delay={0.04}
                      >
                        <div className="text-xs text-muted-foreground w-35">
                          {item.text}
                        </div>
                      </AnimatedTextReveal>
                    </div>
                  </div>

                  <AnimatedFadeUp delay={0.05} duration={0.35}>
                    <HelpActionButton
                      variant={isPrimary ? "default" : "outline"}
                      onClick={() => setActiveItem(item)}
                    >
                      {item.action}
                    </HelpActionButton>
                  </AnimatedFadeUp>
                </div>
              </AnimatedSlideIn>
            );
          })}
        </div>
      </div>
    </SidePanel>
  );
};

export default HelpSheet;
