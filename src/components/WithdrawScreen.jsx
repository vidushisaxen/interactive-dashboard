"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpFromLine, Wallet, Droplets, Coins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExportCsvButton from "./ExportCsvButton";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import LiquidityBarChart from "./LiquidityBarChart";
import { BAR_RAW, WITHDRAW_STEP_CONTENT } from "./dashboard-data";
import { AnimatedFadeUp } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

const getStepFromPercent = (percent) => {
  if (percent <= 25) return 1;
  if (percent <= 50) return 2;
  if (percent <= 75) return 3;
  return 4;
};
const getPercentFromStep = (step) => {
  if (step === 1) return 12;
  if (step === 2) return 37;
  if (step === 3) return 62;
  return 87;
};

function WithdrawSkeleton() {
  return (
    <section className="space-y-7">
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>

      <Skeleton className="h-96 w-full rounded-xl" />
    </section>
  );
}

const WithdrawScreen = () => {
  const [pct, setPct] = useState([25]);
  const [mode, setMode] = useState("single");
  const [collectAsWeth, setCollectAsWeth] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState("Choose a range and review the expected token output.");
  const loading = useScreenSkeleton();

  const percent = pct[0];
  const currentStepIndex = getStepFromPercent(percent) - 1;
  const currentStep = WITHDRAW_STEP_CONTENT[currentStepIndex];

  const totalEth = 38.789;
  const totalBnb = 226.269;
  const totalUsd = 8426.4;
  const currentPoolShare = 4.8;

  const eth = ((percent / 100) * totalEth).toFixed(3);
  const bnb = ((percent / 100) * totalBnb).toFixed(3);

  const remainingEth = (totalEth - Number(eth)).toFixed(3);
  const remainingBnb = (totalBnb - Number(bnb)).toFixed(3);

  const estimatedUsd = ((percent / 100) * totalUsd).toFixed(2);
  const remainingUsd = (totalUsd - Number(estimatedUsd)).toFixed(2);

  const projectedPoolShare = ((100 - percent) / 100 * currentPoolShare).toFixed(2);
  const feesEth = ((percent / 100) * 0.024).toFixed(3);
  const feesBnb = ((percent / 100) * 1.42).toFixed(3);

  const chartData = useMemo(() => {
    const factor = (100 - percent) / 100;

    return BAR_RAW.map((item) => ({
      ...item,
      value:
        typeof item.value === "number"
          ? Number((item.value * factor).toFixed(2))
          : item.value,
    }));
  }, [percent]);

  if (loading) {
    return <WithdrawSkeleton />;
  }

  return (
    <section className="space-y-7">
      <AnimatedFadeUp>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Withdraw Liquidity
          </h1>
          <p className="text-sm text-muted-foreground">
            Adjust your withdrawal amount, review token output, and track the
            effect on your pool position.
          </p>
        </div>
      </AnimatedFadeUp>

      <AnimatedFadeUp delay={0.04}>
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Withdrawal status</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {withdrawStatus}
          </p>
        </div>
      </AnimatedFadeUp>

      {/* TOP 3 CARDS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* WITHDRAW */}
        <AnimatedFadeUp delay={0.06}>
          <Card className="h-full  border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold tracking-tight">Withdraw</CardTitle>
              <CardDescription>
                Choose how much liquidity to remove
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground">Withdrawal Amount</p>
                <p className="text-3xl font-semibold">{percent}%</p>
                <p className="text-xs text-muted-foreground">
                  LP tokens: ~0.000000000000087
                </p>
              </div>

              <Slider
                value={pct}
                onValueChange={setPct}
                max={100}
                step={1}
                className="w-full"
              />

              <Tabs value={mode} onValueChange={setMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single</TabsTrigger>
                  <TabsTrigger value="balanced">Balanced</TabsTrigger>
                </TabsList>
              </Tabs>

              {mode === "single" && (
                <p className="text-xs text-muted-foreground">
                  You will receive a single-token oriented output preview.
                </p>
              )}

              <div className="space-y-3 rounded-lg border  border border-border p-4">
                <p className="text-xs text-muted-foreground">Expected to receive</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>🔷</span>
                    <span>ETH</span>
                  </div>
                  <span className="font-semibold">{eth}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>🟡</span>
                    <span>cBNB</span>
                  </div>
                  <span className="font-semibold">{bnb}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Collect as WETH
                </span>
                <Checkbox
                  checked={collectAsWeth}
                  onCheckedChange={(checked) => setCollectAsWeth(Boolean(checked))}
                />
              </div>

              <Button
                className="w-full cursor-pointer"
                onClick={() =>
                  setWithdrawStatus(
                    `Prepared a ${percent}% ${mode} withdrawal${collectAsWeth ? " collected as WETH" : ""}.`
                  )
                }
              >
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Review Withdrawal
              </Button>
            </CardContent>
          </Card>
        </AnimatedFadeUp>

        {/* PRICE */}
        <AnimatedFadeUp delay={0.1}>
          <Card className="h-full  border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold tracking-tight">Price</CardTitle>
              <CardDescription>
                Current pool conversion and fee details
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 text-sm">
              <div className="rounded-lg border  border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ETH → cBNB</span>
                  <span className="font-semibold">1 ETH = 5.845 cBNB</span>
                </div>
              </div>

              <div className="rounded-lg border  border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">cBNB → ETH</span>
                  <span className="font-semibold">1 cBNB = 0.171 ETH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border  border border-border p-4">
                  <p className="text-xs text-muted-foreground">Swap Fee</p>
                  <p className="mt-1 text-base font-semibold">0.20%</p>
                </div>

                <div className="rounded-lg border  border border-border p-4">
                  <p className="text-xs text-muted-foreground">Price Impact</p>
                  <p className="mt-1 text-base font-semibold text-primary">
                    {(percent * 0.006).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="rounded-lg border  border border-border p-4">
                <p className="text-xs text-muted-foreground">Estimated USD Value</p>
                <p className="mt-1 text-xl font-semibold">${estimatedUsd}</p>
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>

        {/* POOL SHARE + DEPOSITED MERGED */}
        <AnimatedFadeUp delay={0.14}>
          <Card className="h-full  border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold tracking-tight">Pool Share & Deposited</CardTitle>
              <CardDescription>
                Updated ownership, balances, and claimable rewards
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border  border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Pool Share</p>
                  </div>
                  <p className="mt-2 text-xl font-semibold">
                    {projectedPoolShare}%
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    After this withdrawal
                  </p>
                </div>

                <div className="rounded-lg border  border border-border p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Remaining Value</p>
                  </div>
                  <p className="mt-2 text-xl font-semibold">${remainingUsd}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Position left in pool
                  </p>
                </div>
              </div>

              <div className="rounded-lg border  border border-border p-4">
                <p className="text-xs text-muted-foreground">Deposited Assets</p>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">ETH Remaining</p>
                    <p className="mt-1 font-semibold">🔷 {remainingEth}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">cBNB Remaining</p>
                    <p className="mt-1 font-semibold">🟡 {remainingBnb}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border  border border-border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Claimable Fees</p>
                  <p className="mt-1 text-sm font-semibold">
                    🔷 {feesEth} + 🟡 {feesBnb}
                  </p>
                </div>

                <Button variant="secondary" size="sm" className="cursor-pointer">
                  Claim
                </Button>
              </div>

              <div className="rounded-lg border  border border-border p-4">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">LP Position Health</p>
                </div>
                <p className="mt-2 text-sm">
                  {percent <= 25
                    ? "Low impact withdrawal. Your pool position stays strong."
                    : percent <= 50
                    ? "Balanced withdrawal. Moderate reduction in your position."
                    : percent <= 75
                    ? "High withdrawal. Pool share decreases noticeably."
                    : "Very high withdrawal. Most of the liquidity position will be removed."}
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>
      </div>

      <AnimatedFadeUp delay={0.18}>
  <Card className="w-full  border border-border">
    <CardHeader>
      <CardTitle className="text-base font-semibold tracking-tight">Withdrawal Progress & Liquidity</CardTitle>
      <CardDescription>
        Step status updates automatically as the withdrawal percentage changes.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Badge variant="secondary" className="w-fit">
            Step {currentStep.step} / {WITHDRAW_STEP_CONTENT.length}
          </Badge>

          <span className="text-xs text-muted-foreground">
            Steps update automatically from withdrawal percentage
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="text-base font-semibold">{currentStep.title}</h4>
          <p className="text-sm text-muted-foreground">
            {currentStep.description}
          </p>
        </div>

       <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
  {WITHDRAW_STEP_CONTENT.map((item) => {
    const isActive = item.step === currentStep.step;
    const isCompleted = item.step < currentStep.step;

    return (
      <button
        key={item.step}
        type="button"
        onClick={() => setPct([getPercentFromStep(item.step)])}
        className={`rounded-lg border p-4 text-left transition-all cursor-pointer ${
          isActive
            ? "border-[var(--border-stronger-primary)] bg-[var(--border-soft-primary)]"
            : isCompleted
            ? "border-[var(--border-strong-primary)] bg-primary/10"
            : " border border-border bg-background hover:border-[var(--border-strong-primary)] hover:bg-primary/5"
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`text-xs font-medium ${
              isActive || isCompleted
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Step {item.step}
          </span>

          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isActive || isCompleted ? "bg-primary" : "bg-[var(--control-track)]"
            }`}
          />
        </div>

        <p className="text-sm font-medium">{item.title}</p>
      </button>
    );
  })}
</div>

        <div className="rounded-lg border  border border-border bg-muted/20 p-4">
          <p className="text-xs text-muted-foreground">Current Step Summary</p>
          <p className="mt-2 text-sm font-medium">{currentStep.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-lg border  border border-border p-4">
          <p className="text-xs text-muted-foreground">Withdraw %</p>
          <p className="mt-1 text-base font-semibold">{percent}%</p>
        </div>

        <div className="rounded-lg border  border border-border p-4">
          <p className="text-xs text-muted-foreground">Current Step</p>
          <p className="mt-1 text-base font-semibold">{currentStep.step}</p>
        </div>

        <div className="rounded-lg border  border border-border p-4">
          <p className="text-xs text-muted-foreground">ETH Output</p>
          <p className="mt-1 text-base font-semibold">{eth}</p>
        </div>

        <div className="rounded-lg border  border border-border p-4">
          <p className="text-xs text-muted-foreground">cBNB Output</p>
          <p className="mt-1 text-base font-semibold">{bnb}</p>
        </div>
      </div>

      <div className="rounded-lg border  border border-border p-4">
        <div className="mb-4 flex justify-end">
          <ExportCsvButton
            fileName={`quantro_withdraw_${percent}pct`}
            rows={chartData}
            className="rounded-lg"
          />
        </div>
        <LiquidityBarChart data={chartData} height={240} />
      </div>
    </CardContent>
  </Card>
</AnimatedFadeUp>
    </section>
  );
};

export default WithdrawScreen;
