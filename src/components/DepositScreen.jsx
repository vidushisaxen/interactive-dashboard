"use client";

import { useMemo, useState } from "react";
import { ArrowDownToLine } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";

import LiquidityBarChart from "./LiquidityBarChart";
import { BAR_RAW, DEPOSIT_STEP_CONTENT } from "./dashboard-data";
import { AnimatedFadeUp } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function DepositSkeleton() {
  return (
    <section className="space-y-7">
      <div className="space-y-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-5">
        <Skeleton className="h-96 w-full rounded-2xl" />
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
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
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Deposit status</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {depositStatus}
          </p>
        </div>
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-5">
        {/* LEFT PANEL */}
        <div className="space-y-6 2xl:col-span-1">
          <AnimatedFadeUp delay={0.08}>
            <Card>
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
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
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
                  >
                    {!isDisabled && <ArrowDownToLine className="mr-2 h-4 w-4" />}
                    {isDisabled ? "Enter amounts" : "Deposit Liquidity"}
                  </Button>
                </AnimatedFadeUp>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-w-0 flex-col gap-6 2xl:col-span-4">
          {/* TOP 3 CARDS */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <AnimatedFadeUp delay={0.1}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Token Price</CardTitle>
                  <CardDescription>
                    Live pair conversion and deposit valuation
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">ETH → cBNB</span>
                      <span className="font-semibold">1 ETH = 5.845 cBNB</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">cBNB → ETH</span>
                      <span className="font-semibold">1 cBNB = 0.171 ETH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border/60 p-4">
                      <p className="text-xs text-muted-foreground">
                        Estimated Price Impact
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        0.12%
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/60 p-4">
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Pool Share</CardTitle>
                  <CardDescription>
                    Estimated ownership after deposit progression
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                      Your projected share
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {(currentStep.progress * 0.12).toFixed(1)}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border/60 p-4">
                      <p className="text-xs text-muted-foreground">
                        LP Tokens Minted
                      </p>
                      <p className="mt-1 font-semibold">124.82 LP</p>
                    </div>

                    <div className="rounded-lg border border-border/60 p-4">
                      <p className="text-xs text-muted-foreground">
                        Position Rank
                      </p>
                      <p className="mt-1 font-semibold">Top 18%</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/60 p-4 text-sm">
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Deposited Balance</CardTitle>
                  <CardDescription>
                    Current deposited assets and claimable rewards
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border/60 p-4">
                      <p className="text-xs text-muted-foreground">ETH Locked</p>
                      <p className="mt-1 text-base font-semibold">2.08685 ETH</p>
                    </div>

                    <div className="rounded-lg border border-border/60 p-4">
                      <p className="text-xs text-muted-foreground">
                        cBNB Locked
                      </p>
                      <p className="mt-1 text-base font-semibold">18.2693 cBNB</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">
                      Estimated deposit value
                    </p>
                    <p className="mt-1 text-xl font-semibold">$8,426.40</p>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border/60 p-4 text-sm">
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

          <AnimatedFadeUp delay={0.22}>
            <Card className="w-full">
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
                    <Slider
                      value={stepValue}
                      min={1}
                      max={4}
                      step={1}
                      onValueChange={setStepValue}
                      className="w-full"
                    />

                    <div className="grid grid-cols-4 text-xs text-muted-foreground">
                      <span className={stepValue[0] >= 1 ? "font-medium text-foreground" : ""}>
                        Step 1
                      </span>
                      <span
                        className={`text-center ${
                          stepValue[0] >= 2 ? "font-medium text-foreground" : ""
                        }`}
                      >
                        Step 2
                      </span>
                      <span
                        className={`text-center ${
                          stepValue[0] >= 3 ? "font-medium text-foreground" : ""
                        }`}
                      >
                        Step 3
                      </span>
                      <span
                        className={`text-right ${
                          stepValue[0] >= 4 ? "font-medium text-foreground" : ""
                        }`}
                      >
                        Step 4
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-lg border border-border/60 p-4">
                    <p className="text-xs text-muted-foreground">Current Step</p>
                    <p className="mt-1 text-base font-semibold">
                      {currentStep.step}
                    </p>
                  </div>

                  <div className="rounded-lg border border-border/60 p-4">
                    <p className="text-xs text-muted-foreground">Progress Rate</p>
                    <p className="mt-1 text-base font-semibold">
                      {currentStep.progress}%
                    </p>
                  </div>

                  <div className="rounded-lg border border-border/60 p-4">
                    <p className="text-xs text-muted-foreground">Liquidity Factor</p>
                    <p className="mt-1 text-base font-semibold">
                      {currentStep.multiplier}x
                    </p>
                  </div>

                  <div className="rounded-lg border border-border/60 p-4">
                    <p className="text-xs text-muted-foreground">Estimated Growth</p>
                    <p className="mt-1 text-base font-semibold text-primary">
                      +{Math.round(currentStep.multiplier * 100)}%
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 p-4">
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
        </div>
      </div>
    </section>
  );
};

export default DepositScreen;
