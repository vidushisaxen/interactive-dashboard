"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowDownToLine } from "@/components/icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExportCsvButton from "./ExportCsvButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import LiquidityBarChart from "./LiquidityBarChart";
import { BAR_RAW, DEPOSIT_STEP_CONTENT } from "./dashboard-data";
import { AnimatedFadeUp } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function DepositSkeleton() {
  return (
    <section className="space-y-7">
      {/* HEADER */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      {/* STATUS BOX */}
      <div className="rounded-lg border border-border p-4 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-72 max-w-full" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        
        {/* LEFT PANEL */}
        <div className="space-y-6 xl:col-span-4 2xl:col-span-3">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            
            {/* title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* token inputs */}
            {[1, 2].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-12 rounded-md" />
                </div>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}

            {/* checkbox */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3 w-48" />
            </div>

            {/* button */}
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-w-0 flex-col gap-6 xl:col-span-8 2xl:col-span-9">
          
          {/* TOP 3 CARDS */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 space-y-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-48" />
                </div>

                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />

                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM BIG CARD */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-6">
            
            {/* header */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            {/* step controls */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>

            {/* chart */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <Skeleton className="h-9 w-32 rounded-md" />
              </div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DepositScreen = () => {
  const [ethAmt, setEthAmt] = useState("0.0");
  const [bnbAmt, setBnbAmt] = useState("0.0");
  const [stepValue, setStepValue] = useState([1]);
  const [balanced, setBalanced] = useState(true);
  const [depositStatus, setDepositStatus] = useState("Set token amounts to preview your deposit.");
  const loading = useScreenSkeleton();
  const depositIconRef = useRef(null);

  const isDisabled = ethAmt === "0.0" && bnbAmt === "0.0";
  const currentStep = DEPOSIT_STEP_CONTENT[stepValue[0] - 1];

  const chartData = useMemo(() => {
    return BAR_RAW.map((item) => ({
      ...item,
      value:
        typeof item.value === "number"
          ? Number((item.value * currentStep.multiplier).toFixed(2))
          : item.value,
    }));
  }, [currentStep]);

  if (loading) {
    return <DepositSkeleton />;
  }

  return (
    <section className="space-y-7">
      <AnimatedFadeUp>
        <div className="space-y-1">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Deposit</h2>
            <p className="text-sm text-muted-foreground">
              Deposit tokens to earn trading fees and grow your liquidity
              position.
            </p>
          </div>
        </div>
      </AnimatedFadeUp>

      <AnimatedFadeUp delay={0.04}>
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Deposit status</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {depositStatus}
          </p>
        </div>
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
        {/* LEFT PANEL */}
        <div className="space-y-6 xl:col-span-4 2xl:col-span-3">
          <AnimatedFadeUp delay={0.08}>
            <Card className="border border-border shadow-sm xl:sticky xl:top-28">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">Tokens</CardTitle>
                <CardDescription>Select amounts to deposit</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {[
                  { icon: "🔷", token: "ETH", val: ethAmt, setVal: setEthAmt },
                  { icon: "🟡", token: "cBNB", val: bnbAmt, setVal: setBnbAmt },
                ].map(({ icon, token, val, setVal }, index) => (
                  <AnimatedFadeUp key={token} delay={0.1 + index * 0.06}>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span>{icon}</span>
                          {token}
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setVal(token === "ETH" ? "2.50" : "14.61")}
                          className="h-7 px-2 cursor-pointer"
                        >
                          Max
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Wallet balance: 0.00
                      </p>

                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={val}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const sanitized = raw.replace(/[^0-9.]/g, "");
                          const dotCount = (sanitized.match(/\./g) || []).length;
                          if (dotCount > 1) {
                            return;
                          }
                          setVal(sanitized);
                        }}
                        placeholder={`Enter ${token} amount`}
                      />
                    </div>
                  </AnimatedFadeUp>
                ))}

                <AnimatedFadeUp delay={0.22}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="balanced"
                      checked={balanced}
                      onCheckedChange={(checked) => setBalanced(Boolean(checked))}
                    />
                    <label
                      htmlFor="balanced"
                      className="text-xs text-muted-foreground"
                    >
                      Add tokens in balanced proportion
                    </label>
                  </div>
                </AnimatedFadeUp>

                <AnimatedFadeUp delay={0.28}>
                  <Button
                    className="w-full cursor-pointer"
                    disabled={isDisabled}
                    onClick={() =>
                      setDepositStatus(
                        `Prepared ${ethAmt} ETH and ${bnbAmt} cBNB for a ${balanced ? "balanced" : "custom"} deposit mix.`
                      )
                    }
                    onMouseEnter={() => depositIconRef.current?.startAnimation?.()}
                    onMouseLeave={() => depositIconRef.current?.stopAnimation?.()}
                  >
                    {!isDisabled && <ArrowDownToLine ref={depositIconRef} className="mr-2 h-4 w-4" />}
                    {isDisabled ? "Enter amounts" : "Deposit Liquidity"}
                  </Button>
                </AnimatedFadeUp>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-w-0 flex-col gap-6 xl:col-span-8 2xl:col-span-9">
          {/* TOP 3 CARDS */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <AnimatedFadeUp delay={0.1}>
              <Card className="h-full border border-border shadow-sm ">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Token Price</CardTitle>
                  <CardDescription>
                    Live pair conversion and deposit valuation
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">ETH → cBNB</span>
                      <span className="font-semibold">1 ETH = 5.845 cBNB</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">cBNB → ETH</span>
                      <span className="font-semibold">1 cBNB = 0.171 ETH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border  border-border p-4">
                      <p className="text-xs text-muted-foreground">
                        Estimated Price Impact
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        0.12%
                      </p>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <p className="text-xs text-muted-foreground">
                        Swap Fee Tier
                      </p>
                      <p className="mt-1 text-base font-semibold">0.20%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedFadeUp>

            <AnimatedFadeUp delay={0.14}>
              <Card className="h-full border border-border shadow-sm ">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Pool Share</CardTitle>
                  <CardDescription>
                    Estimated ownership after deposit progression
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="rounded-lg border  border-border bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                      Your projected share
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {(currentStep.progress * 0.12).toFixed(1)}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-xs text-muted-foreground">
                        LP Tokens Minted
                      </p>
                      <p className="mt-1 font-semibold">124.82 LP</p>
                    </div>

                    <div className="rounded-lg border  border-border p-4">
                      <p className="text-xs text-muted-foreground">
                        Position Rank
                      </p>
                      <p className="mt-1 font-semibold">Top 18%</p>
                    </div>
                  </div>

                  <div className="rounded-lg border  border-border p-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Share growth at this step
                      </span>
                      <span className="font-semibold text-primary">
                        +{(currentStep.progress * 0.06).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedFadeUp>

            <AnimatedFadeUp delay={0.18}>
              <Card className="h-full border border-border shadow-sm ">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Deposited Balance</CardTitle>
                  <CardDescription>
                    Current deposited assets and claimable rewards
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border  border-border p-4">
                      <p className="text-xs text-muted-foreground">ETH Locked</p>
                      <p className="mt-1 text-base font-semibold">2.08685 ETH</p>
                    </div>

                    <div className="rounded-lg border  border-border p-4">
                      <p className="text-xs text-muted-foreground">
                        cBNB Locked
                      </p>
                      <p className="mt-1 text-base font-semibold">18.2693 cBNB</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                      Estimated deposit value
                    </p>
                    <p className="mt-1 text-xl font-semibold">$8,426.40</p>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border p-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Claimable Fees
                      </p>
                      <p className="mt-1 font-semibold">0.024 ETH + 1.42 cBNB</p>
                    </div>

                    <Button size="sm" variant="secondary" className="cursor-pointer">
                      Claim
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedFadeUp>
          </div>
        </div>
      </div>

      <AnimatedFadeUp delay={0.22}>
        <Card className="w-full border border-border shadow-sm ">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">
              Deposit Progress & Liquidity
            </CardTitle>
            <CardDescription>
              Simulate deposit steps and see liquidity update in real-time
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Badge variant="secondary" className="w-fit">
                  Step {currentStep.step} / {DEPOSIT_STEP_CONTENT.length}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  Drag slider to simulate deposit steps
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-semibold">{currentStep.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentStep.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  {DEPOSIT_STEP_CONTENT.map((step) => {
                    const isActive = stepValue[0] === step.step;
                    return (
                      <button
                        key={step.step}
                        type="button"
                        onClick={() => setStepValue([step.step])}
                        className={`rounded-lg border p-3 text-left transition-colors hover:border-primary hover:bg-primary/10 ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">Step {step.step}</span>
                          {isActive && (
                            <span className="text-[10px] font-medium uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm font-semibold">{step.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-lg border  border-border p-4">
                <p className="text-xs text-muted-foreground">Current Step</p>
                <p className="mt-1 text-base font-semibold">
                  {currentStep.step}
                </p>
              </div>

              <div className="rounded-lg border  border-border p-4">
                <p className="text-xs text-muted-foreground">Progress Rate</p>
                <p className="mt-1 text-base font-semibold">
                  {currentStep.progress}%
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground">Liquidity Factor</p>
                <p className="mt-1 text-base font-semibold">
                  {currentStep.multiplier}x
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground">Estimated Growth</p>
                <p className="mt-1 text-base font-semibold text-primary">
                  +{Math.round(currentStep.multiplier * 100)}%
                </p>
              </div>
            </div>

            <div className="rounded-lg border  border-border p-4">
              <div className="mb-4 flex justify-end">
                <ExportCsvButton
                  fileName={`quantro_deposit_step_${String(currentStep.step).toLowerCase().replace(/\s+/g, "_")}`}
                  rows={chartData}
                  className="rounded-lg"
                />
              </div>
              <LiquidityBarChart
                key={`step-${currentStep.step}`}
                data={chartData}
                height={240}
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
};

export default DepositScreen;
