"use client";

import {
  CheckCircle2,
  CircleHelp,
  Crown,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { useState } from "react";
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

const actions = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "wallet", label: "Connected Accounts", icon: Wallet },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const actionDetails = {
  profile: "Profile details are ready to edit.",
  wallet: "Two connected accounts are synced to this workspace.",
  security: "2FA and security checks are currently active.",
};

const ProfileSheet = ({
  open,
  onOpenChange,
  onNav,
  onOpenSettings,
  onOpenLogout,
}) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [selectedAction, setSelectedAction] = useState("profile");

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
                <div className="rounded-3xl border border-border/60 bg-background/60 p-6">
                  <div className="flex items-start gap-4">
                    <AnimatedFadeUp delay={0.04} duration={0.4}>
                      <Avatar className="h-16 w-16 border border-border/60">
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
                          james@traderly.finance
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
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
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

              <AnimatedSlideIn direction="right" duration={0.45} delay={0.12}>
                <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {actions.find((item) => item.id === selectedAction)?.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {actionDetails[selectedAction]}
                    </p>
                  </div>
                </div>
              </AnimatedSlideIn>

              <div className="space-y-3">
                {actions.map((item, index) => {
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
                        className="h-12 w-full justify-start cursor-pointer rounded-2xl"
                      >
                        <AnimatedFadeUp delay={0.02} duration={0.3}>
                          <Icon className="mr-3 h-4 w-4" />
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
                    onClick={() => {
                      onOpenChange(false);
                      onOpenSettings?.();
                    }}
                    className="h-12 w-full justify-start cursor-pointer rounded-2xl"
                  >
                    <AnimatedFadeUp delay={0.02} duration={0.3}>
                      <Settings className="mr-3 h-4 w-4" />
                    </AnimatedFadeUp>

                    <AnimatedTextReveal y={8} blur="3px" duration={0.3}>
                      <span>Settings</span>
                    </AnimatedTextReveal>
                  </Button>
                </AnimatedSlideIn>

                <AnimatedSlideIn direction="right" duration={0.45} delay={0.33}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenHelp(true)}
                    className="h-12 w-full justify-start cursor-pointer rounded-2xl"
                  >
                    <AnimatedFadeUp delay={0.02} duration={0.3}>
                      <CircleHelp className="mr-3 h-4 w-4" />
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
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onOpenChange(false);
                    onOpenLogout?.();
                  }}
                  className="h-12 w-full justify-start cursor-pointer rounded-2xl"
                >
                  <AnimatedFadeUp delay={0.02} duration={0.3}>
                    <LogOut className="mr-3 h-4 w-4" />
                  </AnimatedFadeUp>

                  <AnimatedTextReveal y={8} blur="3px" duration={0.3}>
                    <span>Sign out</span>
                  </AnimatedTextReveal>
                </Button>
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
