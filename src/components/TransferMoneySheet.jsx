"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CreditCard,
  SendHorizontal,
  UserRound,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import SidePanel from "./SidePanel";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";

const transferTypes = [
  {
    id: "personal",
    icon: UserRound,
    title: "Personal Transfer",
    description: "Send to an individual",
  },
  {
    id: "bank",
    icon: Building2,
    title: "Bank Transfer",
    description: "Transfer to bank account",
  },
];

const TransferMoneySheet = ({ open, onOpenChange }) => {
  const [transferType, setTransferType] = useState("personal");
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    note: "Rent payment",
  });
  const [transferStatus, setTransferStatus] = useState(
    "Pick a transfer type and enter recipient details."
  );
  const amountValue = Number(form.amount || 0);
  const canSubmit =
    Number.isFinite(amountValue) && amountValue > 0 && form.recipient.trim().length > 0;

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Transfer Funds"
      subtitle="Send money to a saved recipient or bank destination"
      width="md"
    >
      <div className="space-y-6">
        {/* TOP CARD */}
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal>
                <p className="text-sm font-medium">Outgoing transfer</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal delay={0.05}>
                <p className="text-xs text-muted-foreground">
                  Choose a destination type and complete the transfer details.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08}>
              <Badge variant="secondary" className="rounded-full">
                Instant
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        {/* TRANSFER TYPE */}
        <AnimatedSlideIn direction="right" delay={0.06}>
          <div className="space-y-4">
            <AnimatedTextReveal>
              <p className="text-sm font-medium">Transfer type</p>
            </AnimatedTextReveal>

            <div className="grid grid-cols-2 gap-3">
              {transferTypes.map((item, index) => {
                const Icon = item.icon;
                const active = transferType === item.id;

                return (
                  <AnimatedSlideIn
                    key={item.id}
                    direction="right"
                    delay={0.08 + index * 0.06}
                  >
                    <button
                      type="button"
                      onClick={() => setTransferType(item.id)}
                      className={cn(
                        "rounded-2xl border p-4 cursor-pointer text-left transition-colors",
                        "hover:bg-accent/40",
                        active
                          ? "border-primary/30 bg-primary/5"
                          : "border-border/60 bg-background/60"
                      )}
                    >
                      <AnimatedFadeUp>
                        <div
                          className={cn(
                            "mb-3 flex h-10 w-10 items-center justify-center rounded-2xl",
                            active
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </AnimatedFadeUp>

                      <AnimatedTextReveal>
                        <div className="text-sm font-medium">
                          {item.title}
                        </div>
                      </AnimatedTextReveal>

                      <AnimatedTextReveal delay={0.04}>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </AnimatedTextReveal>
                    </button>
                  </AnimatedSlideIn>
                );
              })}
            </div>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" delay={0.1}>
          <Separator />
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" delay={0.11}>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">Transfer status</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {transferStatus}
            </p>
          </div>
        </AnimatedSlideIn>

        {/* FIELDS */}
        <div className="space-y-4">
          <Field
            icon={UserRound}
            label="Recipient"
            placeholder={
              transferType === "personal"
                ? "Select recipient"
                : "Account holder or destination"
            }
            value={form.recipient}
            onChange={(value) => setForm((prev) => ({ ...prev, recipient: value }))}
            delay={0.12}
          />

          <Field
            icon={CreditCard}
            label="Amount"
            placeholder="$0.00"
            value={form.amount}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, amount: value.replace(/[^0-9.]/g, "") }))
            }
            delay={0.16}
          />

          <Field
            icon={ArrowRight}
            label="Note"
            placeholder="Rent payment"
            value={form.note}
            onChange={(value) => setForm((prev) => ({ ...prev, note: value }))}
            delay={0.2}
          />
        </div>

        {/* SUMMARY */}
        <AnimatedSlideIn direction="right" delay={0.24}>
          <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <AnimatedTextReveal>
                <span className="text-muted-foreground">Transfer fee</span>
              </AnimatedTextReveal>

              <AnimatedFadeUp>
                <span className="font-medium">$0.00</span>
              </AnimatedFadeUp>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <AnimatedTextReveal delay={0.04}>
                <span className="text-muted-foreground">
                  Estimated arrival
                </span>
              </AnimatedTextReveal>

              <AnimatedFadeUp delay={0.05}>
                <span className="font-medium">
                  {transferType === "bank" ? "Same day" : "Instant"}
                </span>
              </AnimatedFadeUp>
            </div>
          </div>
        </AnimatedSlideIn>

        {/* ACTIONS */}
        <AnimatedSlideIn direction="up" delay={0.3}>
          <div className="flex justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-2xl cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="button"
              disabled={!canSubmit}
              onClick={() =>
                setTransferStatus(
                  `${transferType === "bank" ? "Bank transfer" : "Personal transfer"} ready for $${amountValue.toFixed(2)} to ${form.recipient}.`
                )
              }
              className="rounded-2xl cursor-pointer"
            >
              <SendHorizontal className="mr-2 h-4 w-4" />
              Continue transfer
            </Button>
          </div>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

const Field = ({ icon: Icon, label, placeholder, value, onChange, delay = 0 }) => (
  <AnimatedSlideIn direction="right" delay={delay}>
    <div className="space-y-2">
      <AnimatedTextReveal>
        <Label>{label}</Label>
      </AnimatedTextReveal>

      <AnimatedFadeUp delay={0.04}>
        <div className="relative">
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </AnimatedFadeUp>
    </div>
  </AnimatedSlideIn>
);

export default TransferMoneySheet;
