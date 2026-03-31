"use client";

import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  CalendarClock,
  Sparkles,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import { MOVE_MONEY_ACCOUNTS, MOVE_MONEY_ACTIVITY_FEED } from "./dashboard-data";

function MoveMoneySkeleton() {
  return (
    <section className="space-y-7">
      {/* Header */}
      <header className="space-y-2">
        <Skeleton className="h-6 w-28 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
      </header>

      {/* Status */}
      <div className="rounded-lg border border-border p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full max-w-2xl" />
        </div>
      </div>

      {/* Main form card */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          {/* Account selector 1 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={`from-${item}`}
                  className="rounded-lg border border-border bg-background/60 p-4"
                >
                  <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-6 w-24" />
                  <Skeleton className="mt-2 h-3 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Account selector 2 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={`to-${item}`}
                  className="rounded-lg border border-border bg-background/60 p-4"
                >
                  <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-6 w-24" />
                  <Skeleton className="mt-2 h-3 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full max-w-xl" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-3">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* Recent internal moves */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-80 max-w-full" />
              </div>

              {[1, 2, 3].map((item) => (
                <div
                  key={`recent-${item}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="ml-auto h-4 w-20" />
                    <Skeleton className="ml-auto h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transfer history */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`history-${item}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-4"
                >
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Treasury snapshot */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`snapshot-${item}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-4"
                >
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Smart suggestions */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>

              {[1, 2].map((item) => (
                <div
                  key={`suggestion-${item}`}
                  className="rounded-lg border border-border p-4"
                >
                  <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="mt-2 h-3 w-full" />
                  <Skeleton className="mt-1 h-3 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const MoveMoneyScreen = () => {
  const [fromAccount, setFromAccount] = useState("main");
  const [toAccount, setToAccount] = useState("vault");
  const [amount, setAmount] = useState("1250");
  const [reference, setReference] = useState("Quarterly reserve allocation");
  const [status, setStatus] = useState(
    "Move funds between internal balances to keep operations, savings, and growth budgets in sync."
  );
  const loading = useScreenSkeleton();

  const amountValue = Number(amount || 0);
  const canSubmit =
    fromAccount !== toAccount && Number.isFinite(amountValue) && amountValue > 0;

  const selectedFrom = useMemo(
    () => MOVE_MONEY_ACCOUNTS.find((account) => account.id === fromAccount),
    [fromAccount]
  );
  const selectedTo = useMemo(
    () => MOVE_MONEY_ACCOUNTS.find((account) => account.id === toAccount),
    [toAccount]
  );

  if (loading) {
    return <MoveMoneySkeleton />;
  }

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary" className="rounded-full">
            Move Money
          </Badge>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.04}>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Rebalance internal funds
            </h1>
            <p className="text-sm text-muted-foreground">
              Shift money between business balances with dummy finance content
              for planning, reserves, and campaign budgets.
            </p>
          </div>
        </AnimatedFadeUp>
      </header>

      <AnimatedFadeUp delay={0.08}>
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Transfer status</p>
          <p className="mt-1 text-xs text-muted-foreground">{status}</p>
        </div>
      </AnimatedFadeUp>

      <AnimatedFadeUp delay={0.12}>
        <Card className=" border border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Account routing
            </CardTitle>
            <CardDescription>
              Pick where the funds should move from and where they should
              land.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Amount"
                placeholder="$0.00"
                value={amount}
                onChange={(value) => setAmount(value.replace(/[^0-9.]/g, ""))}
              />

              <div className="space-y-2">
                <Label>Reference</Label>
                <Select
                  value={reference}
                  onValueChange={setReference}
                >
                  <SelectTrigger className="h-12! w-full rounded-lg">
                    <SelectValue placeholder="Select a reference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quarterly reserve allocation">Quarterly reserve allocation</SelectItem>
                    <SelectItem value="Monthly budget adjustment">Monthly budget adjustment</SelectItem>
                    <SelectItem value="Campaign funding">Campaign funding</SelectItem>
                    <SelectItem value="Emergency fund transfer">Emergency fund transfer</SelectItem>
                    <SelectItem value="Payroll preparation">Payroll preparation</SelectItem>
                    <SelectItem value="Investment reallocation">Investment reallocation</SelectItem>
                    <SelectItem value="Tax payment">Tax payment</SelectItem>
                    <SelectItem value="Vendor payment">Vendor payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                  <ArrowRightLeft className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Move preview</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFrom?.title} to {selectedTo?.title} for{" "}
                    {amountValue > 0 ? `$${amountValue.toFixed(2)}` : "$0.00"}.
                    Internal transfers stay fee-free in this demo flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() =>
                  setStatus(
                    "Draft saved. You can keep adjusting accounts before confirming the internal move."
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
                  setStatus(
                    `Scheduled $${amountValue.toFixed(2)} from ${selectedFrom?.title} to ${selectedTo?.title} with reference "${reference || "General transfer"}".`
                  )
                }
              >
                Confirm move
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6 xl:col-span-1">
          <AnimatedFadeUp delay={0.16}>
            <Card className=" border border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Recent internal moves
                </CardTitle>
                <CardDescription>
                  Dummy activity to show how treasury balancing has been flowing
                  this week.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {MOVE_MONEY_ACTIVITY_FEED.map((item) => (
                  <div
                    key={`${item.label}-${item.time}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.meta} • {item.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.amount}</p>
                      <p className="text-xs text-(--status-success)">Completed</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.18}>
            <Card className=" border border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Transfer history
                </CardTitle>
                <CardDescription>
                  Detailed logs of all internal fund movements.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <MetricRow label="Total transfers this month" value="24" />
                <MetricRow label="Average transfer amount" value="$2,450" />
                <MetricRow label="Pending approvals" value="2" />
                <MetricRow label="Failed transfers" value="0" />
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        <div className="space-y-6 xl:col-span-1">
          <AnimatedFadeUp delay={0.14}>
            <Card className=" border border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Treasury snapshot
                </CardTitle>
                <CardDescription>
                  Quick dummy metrics for today&apos;s available finance rails.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <MetricRow label="Instant transfer limit" value="$25,000" />
                <MetricRow label="Same-day settlement left" value="$9,600" />
                <MetricRow label="Auto-rules firing today" value="3 rules" />
                <MetricRow label="Reserve ratio" value="41%" />
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.20}>
            <Card className=" border border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Smart suggestions
                </CardTitle>
                <CardDescription>
                  Helpful prompts based on the balances in this demo workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <SuggestionCard
                  icon={CalendarClock}
                  title="Payroll buffer is below target"
                  description="Move $900 into Savings Vault before Monday payroll reconciliation."
                />
                <SuggestionCard
                  icon={Sparkles}
                  title="Campaign wallet is trending high"
                  description="Shift excess spend back to Main Balance to keep this week&apos;s runway healthy."
                />
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
};

const AccountSelector = ({ label, selectedId, onSelect }) => (
  <div className="space-y-3">
    <p className="text-sm font-medium">{label}</p>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {MOVE_MONEY_ACCOUNTS.map((account) => {
        const Icon = account.icon;
        const active = selectedId === account.id;

        return (
          <button
            key={`${label}-${account.id}`}
            type="button"
            onClick={() => onSelect(account.id)}
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              "hover:bg-accent/40",
              active
                ? "border-primary/30 bg-primary/5"
                : " border border-border bg-background/60"
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
            <p className="text-sm font-medium">{account.title}</p>
            <p className="mt-1 text-lg font-semibold">{account.amount}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {account.description}
            </p>
          </button>
        );
      })}
    </div>
  </div>
);

const Field = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 rounded-lg"
    />
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

const SuggestionCard = ({ icon: Icon, title, description }) => (
  <div className="rounded-lg border border-border p-4">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <p className="text-sm font-medium">{title}</p>
    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
  </div>
);

export default MoveMoneyScreen;
