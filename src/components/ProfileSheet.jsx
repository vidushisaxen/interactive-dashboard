"use client";

import {
  CheckCircle2,
  CircleHelp,
  Crown,
} from "@/components/icons";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import SidePanel from "./SidePanel";
import HelpSheet from "./HelpSheet";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";
import {PROFILE_ACTIONS } from "./dashboard-data";

const ProfileSheet = ({
  open,
  onOpenChange,
  onNav,
}) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [selectedAction, setSelectedAction] = useState("profile");
  const actionIconRefs = useRef({});
  const helpIconRef = useRef(null);

  return (
    <>
      <SidePanel
        open={open}
        onClose={() => onOpenChange(false)}
        title="My Profile"
        subtitle="Manage your account and workspace"
      >
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="profile-sheet-content"
              initial={{ opacity: 0, x: 28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 18, scale: 0.99 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-6"
            >
              <AnimatedSlideIn direction="right" duration={0.55}>
                <div className="rounded-xl border  border border-border bg-background/60 p-6">
                  <div className="flex items-start gap-4">
                    <AnimatedFadeUp delay={0.04} duration={0.4}>
                      <Avatar className="h-16 w-16 border  border border-border">
                        <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
                          JK
                        </AvatarFallback>
                      </Avatar>
                    </AnimatedFadeUp>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <AnimatedTextReveal y={12} blur="5px" duration={0.4}>
                          <h3 className="text-lg font-semibold tracking-tight">
                            James Kole
                          </h3>
                        </AnimatedTextReveal>

                        <AnimatedFadeUp delay={0.08} duration={0.4}>
                          <Badge className="rounded-full">
                            <Crown className="mr-1 h-3.5 w-3.5" />
                            Premium Plan
                          </Badge>
                        </AnimatedFadeUp>
                      </div>

                      <AnimatedTextReveal
                        y={12}
                        blur="5px"
                        duration={0.4}
                        delay={0.05}
                      >
                        <p className="mt-1 text-sm text-muted-foreground">
                          james@quantro.finance
                        </p>
                      </AnimatedTextReveal>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <AnimatedFadeUp delay={0.1} duration={0.35}>
                          <Badge variant="secondary" className="rounded-full">
                            Verified Account
                          </Badge>
                        </AnimatedFadeUp>

                        <AnimatedFadeUp delay={0.14} duration={0.35}>
                          <Badge variant="outline" className="rounded-full">
                            Workspace Owner
                          </Badge>
                        </AnimatedFadeUp>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSlideIn>

              <AnimatedSlideIn direction="right" duration={0.5} delay={0.08}>
                <div className="rounded-lg border  border border-border bg-muted/30 p-4">
                  <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
                    <p className="text-sm font-medium">Account overview</p>
                  </AnimatedTextReveal>

                  <AnimatedTextReveal
                    y={10}
                    blur="4px"
                    duration={0.35}
                    delay={0.04}
                  >
                    <p className="text-xs text-muted-foreground">
                      Access profile settings, security options, and connected
                      accounts.
                    </p>
                  </AnimatedTextReveal>
                </div>
              </AnimatedSlideIn>
              <div className="space-y-3">
                {PROFILE_ACTIONS.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <AnimatedSlideIn
                      key={item.id}
                      direction="right"
                      duration={0.45}
                      delay={0.12 + index * 0.05}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedAction(item.id);
                          onNav?.(item.id);
                        }}
                        onMouseEnter={() => actionIconRefs.current[item.id]?.startAnimation?.()}
                        onMouseLeave={() => actionIconRefs.current[item.id]?.stopAnimation?.()}
                        className="h-12 w-full justify-start cursor-pointer rounded-lg"
                      >
                        <AnimatedFadeUp delay={0.02} duration={0.3}>
                          <Icon
                            ref={(node) => {
                              actionIconRefs.current[item.id] = node;
                            }}
                            className="mr-3 h-4 w-4"
                          />
                        </AnimatedFadeUp>

                        <AnimatedTextReveal y={8} blur="3px" duration={0.3}>
                          <span>{item.label}</span>
                        </AnimatedTextReveal>
                      </Button>
                    </AnimatedSlideIn>
                  );
                })}

                <AnimatedSlideIn direction="right" duration={0.45} delay={0.28}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenHelp(true)}
                    onMouseEnter={() => helpIconRef.current?.startAnimation?.()}
                    onMouseLeave={() => helpIconRef.current?.stopAnimation?.()}
                    className="h-12 w-full justify-start cursor-pointer rounded-lg"
                  >
                    <AnimatedFadeUp delay={0.02} duration={0.3}>
                      <CircleHelp ref={helpIconRef} className="mr-3 h-4 w-4" />
                    </AnimatedFadeUp>

                    <AnimatedTextReveal y={8} blur="3px" duration={0.3}>
                      <span>Help</span>
                    </AnimatedTextReveal>
                  </Button>
                </AnimatedSlideIn>
              </div>

              <AnimatedSlideIn direction="up" duration={0.4} delay={0.38}>
                <Separator />
              </AnimatedSlideIn>

              <AnimatedSlideIn direction="up" duration={0.45} delay={0.42}>
                <p className="text-xs text-muted-foreground">
                  Settings and sign out are available from the sidebar to keep account actions in one place.
                </p>
              </AnimatedSlideIn>
            </motion.div>
          )}
        </AnimatePresence>
      </SidePanel>

      <HelpSheet open={openHelp} onOpenChange={setOpenHelp} />
    </>
  );
};

export default ProfileSheet;
