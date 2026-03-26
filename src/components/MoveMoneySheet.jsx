"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Landmark, WalletCards, X } from "lucide-react";

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

const accounts = [
  {
    id: "main",
    icon: Landmark,
    title: "Main Balance",
    amount: "$10,254.00 available",
  },
  {
    id: "vault",
    icon: WalletCards,
    title: "Savings Vault",
    amount: "$8,420.00 available",
  },
];

const MoveMoneySheet = ({ open, onOpenChange }) => {
  const [fromAccount, setFromAccount] = useState("main");
  const [toAccount, setToAccount] = useState("vault");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("Monthly allocation");
  const [status, setStatus] = useState("Select source, destination, and amount.");

  const amountValue = Number(amount || 0);
  const canSubmit =
    fromAccount !== toAccount && Number.isFinite(amountValue) && amountValue > 0;

  const selectedFrom = useMemo(
    () => accounts.find((account) => account.id === fromAccount),
    [fromAccount]
  );
  const selectedTo = useMemo(
    () => accounts.find((account) => account.id === toAccount),
    [toAccount]
  );

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Move Money"
      subtitle="Move funds between your balances"
      width="w-[460px]"
    >
      <div className="space-y-6">
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal y={14} blur="6px" duration={0.45}>
                <p className="text-sm font-medium">Internal transfer</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={14}
                blur="6px"
                duration={0.45}
                delay={0.05}
              >
                <p className="text-xs text-muted-foreground">
                  Select source and destination balances.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08} duration={0.4}>
              <Badge variant="secondary" className="rounded-full">
                Instant
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.48} delay={0.06}>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">Transfer status</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedFrom?.title} to {selectedTo?.title}. {status}
            </p>
          </div>
        </AnimatedSlideIn>

        <AccountSelector
          label="From account"
          selectedId={fromAccount}
          onSelect={setFromAccount}
        />

        <AccountSelector
          label="To account"
          selectedId={toAccount}
          onSelect={setToAccount}
        />

        <AnimatedSlideIn direction="up" duration={0.4} delay={0.12}>
          <Separator />
        </AnimatedSlideIn>

        <Field
          label="Amount"
          placeholder="$0.00"
          value={amount}
          onChange={setAmount}
          delay={0.12}
        />

        <Field
          label="Reference"
          placeholder="Monthly allocation"
          value={reference}
          onChange={setReference}
          delay={0.16}
        />

        <AnimatedSlideIn direction="right" duration={0.5} delay={0.2}>
          <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
            <div className="flex items-start gap-3">
              <AnimatedFadeUp delay={0.03} duration={0.35}>
                <div className="mt-0.5 text-primary">
                  <ArrowRightLeft className="h-4 w-4" />
                </div>
              </AnimatedFadeUp>

              <div className="space-y-1">
                <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
                  <p className="text-base font-medium">Transfer details</p>
                </AnimatedTextReveal>

                <AnimatedTextReveal
                  y={10}
                  blur="4px"
                  duration={0.35}
                  delay={0.04}
                >
                  <p className="text-xs text-muted-foreground">
                    Transfers between internal balances are instant and fee-free.
                  </p>
                </AnimatedTextReveal>
              </div>
            </div>
          </div>
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
              Cancel
            </Button>

            <Button
              type="button"
              disabled={!canSubmit}
              onClick={() =>
                setStatus(
                  `Scheduled $${amountValue.toFixed(2)} with reference "${reference || "General transfer"}".`
                )
              }
              className="rounded-2xl cursor-pointer"
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Confirm move
            </Button>
          </div>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

const AccountSelector = ({ label, selectedId, onSelect }) => (
  <AnimatedSlideIn direction="right" duration={0.55} delay={0.06}>
    <div className="space-y-4">
      <AnimatedTextReveal y={12} blur="5px" duration={0.4}>
        <p className="text-sm font-medium">{label}</p>
      </AnimatedTextReveal>

      <div className="grid grid-cols-2 gap-3">
        {accounts.map((account, index) => {
          const Icon = account.icon;
          const active = selectedId === account.id;

          return (
            <AnimatedSlideIn
              key={`${label}-${account.id}`}
              direction="right"
              duration={0.45}
              delay={0.08 + index * 0.06}
            >
              <button
                type="button"
                onClick={() => onSelect(account.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-colors cursor-pointer",
                  "hover:bg-accent/40",
                  active
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/60 bg-background/60"
                )}
              >
                <AnimatedFadeUp delay={0.02} duration={0.35}>
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

                <div className="space-y-1">
                  <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
                    <div className="text-base font-medium">{account.title}</div>
                  </AnimatedTextReveal>

                  <AnimatedTextReveal
                    y={10}
                    blur="4px"
                    duration={0.35}
                    delay={0.04}
                  >
                    <div className="text-xs text-muted-foreground">
                      {account.amount}
                    </div>
                  </AnimatedTextReveal>
                </div>
              </button>
            </AnimatedSlideIn>
          );
        })}
      </div>
    </div>
  </AnimatedSlideIn>
);

const Field = ({ label, placeholder, value, onChange, delay = 0 }) => (
  <AnimatedSlideIn direction="right" duration={0.45} delay={delay}>
    <div className="space-y-2">
      <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
        <Label>{label}</Label>
      </AnimatedTextReveal>

      <AnimatedFadeUp delay={0.04} duration={0.35}>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-2xl"
        />
      </AnimatedFadeUp>
    </div>
  </AnimatedSlideIn>
);

export default MoveMoneySheet;
