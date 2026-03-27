"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CreditCard,
  SendHorizontal,
  ShieldCheck,
  UserRound,
} from "lucide-react";

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
      <div className="space-y-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <Skeleton className="h-24 w-full rounded-3xl" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Skeleton className="h-96 w-full rounded-3xl xl:col-span-3" />
        <div className="space-y-6 xl:col-span-2">
          <Skeleton className="h-56 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
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
          <Badge variant="secondary" className="rounded-full">
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
        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Transfer status</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {transferStatus}
          </p>
        </div>
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <AnimatedFadeUp delay={0.12}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Outgoing transfer builder
                </CardTitle>
                <CardDescription>
                  Configure the recipient, amount, and note before you send.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
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
                            "rounded-2xl border p-4 text-left transition-colors",
                            "hover:bg-accent/40",
                            active
                              ? "border-primary/30 bg-primary/5"
                              : "border-border/60 bg-background/60"
                          )}
                        >
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

                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-2xl bg-primary/10 p-2 text-primary">
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

                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl"
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
                    className="rounded-2xl"
                    onClick={() =>
                      setTransferStatus(
                        `${transferType === "bank" ? "Bank transfer" : "Personal transfer"} ready for $${amountValue.toFixed(2)} to ${form.recipient}.`
                      )
                    }
                  >
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Continue transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        <div className="space-y-6">
          <AnimatedFadeUp delay={0.14}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Transfer details
                </CardTitle>
                <CardDescription>
                  Dummy summary values for the outgoing payment rail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricRow label="Available to send" value="$10,254.00" />
                <MetricRow label="Transfer fee" value="$0.00" />
                <MetricRow
                  label="Estimated arrival"
                  value={transferType === "bank" ? "Same day" : "Instant"}
                />
                <MetricRow label="Approval required" value="No" />
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.18}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Recent beneficiaries
                </CardTitle>
                <CardDescription>
                  Sample transfer destinations to make the screen feel complete.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {TRANSFER_BENEFICIARIES.map((item) => (
                  <div
                    key={`${item.name}-${item.amount}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type} • {item.arrival}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.amount}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-7 rounded-xl px-2"
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
        className="h-12 rounded-2xl pl-11"
      />
    </div>
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

export default TransferMoneyScreen;
