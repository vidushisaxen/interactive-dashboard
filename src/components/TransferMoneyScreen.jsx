"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  CreditCard,
  SendHorizontal,
  ShieldCheck,
  UserRound,
} from "@/components/icons";

import { AnimatedFadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import { TRANSFER_BENEFICIARIES, TRANSFER_TYPES } from "./dashboard-data";

function TransferMoneySkeleton() {
  return (
    <section className="space-y-7">
      {/* HEADER */}
      <header className="space-y-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
      </header>

      {/* STATUS */}
      <div className="rounded-lg bg-muted/20 p-4 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-full max-w-2xl" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        
        {/* LEFT: FORM */}
        <div className="space-y-6 xl:col-span-3">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            {/* Transfer type cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-background/50 p-4 space-y-3"
                >
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              ))}
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            {/* Review box */}
            <div className="rounded-lg bg-muted/20 p-4 space-y-2">
              <div className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-background/50 p-3 space-y-2"
                >
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>

            {/* Capacity */}
            <div className="rounded-lg bg-background/50 p-4 space-y-2">
              <Skeleton className="h-3 w-32" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 xl:col-span-2">
          
          {/* Transfer details */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-muted/20 p-4"
              >
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Beneficiaries */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 rounded-lg bg-background/50 p-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-28" />
                </div>

                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-20 ml-auto" />
                  <Skeleton className="h-7 w-24 ml-auto rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TransferMoneyScreen = () => {
  const [transferType, setTransferType] = useState("personal");
  const [form, setForm] = useState({
    recipient: "Northwind Supply",
    amount: "2450",
    note: "April inventory deposit",
  });
  const [transferStatus, setTransferStatus] = useState(
    "Choose a destination, review dummy fees, and finalize the outgoing transfer."
  );
  const loading = useScreenSkeleton();
  const continueIconRef = useRef(null);

  if (loading) {
    return <TransferMoneySkeleton />;
  }

  const amountValue = Number(form.amount || 0);
  const canSubmit =
    Number.isFinite(amountValue) && amountValue > 0 && form.recipient.trim().length > 0;

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary">
            Transfer
          </Badge>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.04}>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Send money outside your workspace
            </h1>
            <p className="text-sm text-muted-foreground">
              Use a full transfer screen for external payouts with dummy
              recipients, timing, and review details.
            </p>
          </div>
        </AnimatedFadeUp>
      </header>

      <AnimatedFadeUp delay={0.08}>
        <div className="rounded-lg border border-[color:var(--layout-divider)] p-4">
          <p className="text-sm font-medium">Transfer status</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {transferStatus}
          </p>
        </div>
      </AnimatedFadeUp>

      <div className="grid min-h-[calc(100vh-220px)] grid-cols-1 gap-6 items-start xl:grid-cols-5 xl:items-stretch">
        <div className="space-y-6 xl:col-span-3 xl:h-full">
          <AnimatedFadeUp delay={0.12}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Outgoing transfer builder
                </CardTitle>
                <CardDescription>
                  Configure the recipient, amount, and note before you send.
                </CardDescription>
              </CardHeader>

              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium">Transfer type</p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {TRANSFER_TYPES.map((item) => {
                      const Icon = item.icon;
                      const active = transferType === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTransferType(item.id)}
                          className={cn(
                            "rounded-lg p-4 text-left transition-colors ring-1 ring-inset",
                            "hover:bg-accent/40",
                            active
                              ? "ring-primary/25 bg-primary/5"
                              : "ring-border/15 bg-background/60"
                          )}
                        >
                          <div
                            className={cn(
                              "mb-3 flex h-10 w-10 items-center justify-center rounded-lg",
                              active
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Field
                    icon={UserRound}
                    label="Recipient"
                    placeholder={
                      transferType === "personal"
                        ? "Enter recipient name"
                        : "Enter bank account or business name"
                    }
                    value={form.recipient}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, recipient: value }))
                    }
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      icon={CreditCard}
                      label="Amount"
                      placeholder="$0.00"
                      value={form.amount}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          amount: value.replace(/[^0-9.]/g, ""),
                        }))
                      }
                    />
                    <Field
                      icon={ArrowRight}
                      label="Note"
                      placeholder="April inventory deposit"
                      value={form.note}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, note: value }))
                      }
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Review before send</p>
                      <p className="text-xs text-muted-foreground">
                        {transferType === "bank" ? "Bank" : "Personal"} transfer
                        for {amountValue > 0 ? ` $${amountValue.toFixed(2)}` : " $0.00"}{" "}
                        to {form.recipient || "recipient"}. Arrival is{" "}
                        {transferType === "bank" ? "same day" : "instant"} in
                        this demo flow.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-lg bg-background/50 p-3 text-sm">
                    <p className="text-xs text-muted-foreground">Suggested memo</p>
                    <p className="mt-1 font-medium">
                      &quot;Vendor invoice #4511 then reconcile&quot;
                    </p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-3 text-sm">
                    <p className="text-xs text-muted-foreground">Recommended risk level</p>
                    <p className="mt-1 font-medium">Medium</p>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">Transfer capacity</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Used: $2,450 / $50,000</span>
                    <span className="text-xs text-primary">4.9% available</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={() =>
                      setTransferStatus(
                        "Draft saved. Beneficiary and amount details are ready for final review."
                      )
                    }
                  >
                    Save draft
                  </Button>
                  <Button
                    type="button"
                    disabled={!canSubmit}
                    className="rounded-lg"
                    onClick={() =>
                      setTransferStatus(
                        `${transferType === "bank" ? "Bank transfer" : "Personal transfer"} ready for $${amountValue.toFixed(2)} to ${form.recipient}.`
                      )
                    }
                    onMouseEnter={() => continueIconRef.current?.startAnimation?.()}
                    onMouseLeave={() => continueIconRef.current?.stopAnimation?.()}
                  >
                    <SendHorizontal ref={continueIconRef} className="mr-2 h-4 w-4" />
                    Continue transfer
                  </Button>
                </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        <div className="space-y-7 xl:col-span-2 flex h-full flex-col">
          <AnimatedFadeUp delay={0.14}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Transfer details
                </CardTitle>
                <CardDescription>
                  Dummy summary values for the outgoing payment rail.
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-3">
                  <MetricRow label="Available to send" value="$10,254.00" />
                  <MetricRow label="Transfer fee" value="$0.00" />
                  <MetricRow
                    label="Estimated arrival"
                    value={transferType === "bank" ? "Same day" : "Instant"}
                  />
                  <MetricRow label="Approval required" value="No" />
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.18}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Recent beneficiaries
                </CardTitle>
                <CardDescription>
                  Sample transfer destinations to make the screen feel complete.
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-3">
                  {TRANSFER_BENEFICIARIES.map((item) => (
                    <div
                      key={`${item.name}-${item.amount}`}
                      className="flex items-center justify-between gap-4 rounded-lg bg-muted/20 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.type} • {item.arrival}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold">{item.amount}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-7 rounded-lg px-2"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              recipient: item.name,
                              amount: item.amount.replace(/[$,]/g, ""),
                            }))
                          }
                        >
                          Use details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
};

const Field = ({ icon: Icon, label, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-lg pl-11"
      />
    </div>
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-lg bg-muted/20 p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

export default TransferMoneyScreen;
