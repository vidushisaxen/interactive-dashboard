"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowUpFromLine, Wallet, Droplets, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExportCsvButton from "./ExportCsvButton";
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
      {/* HEADER */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* STATUS */}
      <div className="rounded-lg border border-border p-4 space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-full max-w-2xl" />
      </div>

      {/* TOP 3 CARDS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        
        {/* WITHDRAW CARD */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* percent */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>

          {/* slider */}
          <Skeleton className="h-2 w-full rounded-full" />

          {/* tabs */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* expected receive */}
          <div className="rounded-lg border border-border p-4 space-y-3">
            <Skeleton className="h-3 w-32" />

            {[1, 2].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          {/* checkbox */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4 rounded-sm" />
          </div>

          {/* button */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* PRICE CARD */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>

          {[1, 2].map((_, i) => (
            <div key={i} className="rounded-lg border border-border p-4 flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border p-4 space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>

        {/* POOL SHARE CARD */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border p-4 space-y-3">
            <Skeleton className="h-3 w-32" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <div className="flex justify-between items-center border border-border p-4 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>

          <div className="rounded-lg border border-border p-4 space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        
        {/* step header */}
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        {/* step cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>

        {/* summary */}
        <div className="rounded-lg border border-border p-4 space-y-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>

        {/* chart */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      </div>
    </section>
  );
}

const WithdrawScreen = () => {
  const [pct, setPct] = useState([25]);
  const [mode, setMode] = useState("single");
  const [collectAsWeth, setCollectAsWeth] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState("Choose a range and review the expected token output.");
  const loading = useScreenSkeleton();
const trackRef = useRef(null);


  const percent = pct[0];
  const currentStepIndex = getStepFromPercent(percent) - 1;
  const currentStep = WITHDRAW_STEP_CONTENT[currentStepIndex];

  const totalEth = 38.789;
  const totalBnb = 226.269;
  const totalUsd = 8426.4;
  const currentPoolShare = 4.8;

  const baseEth = ((percent / 100) * totalEth).toFixed(3);
  const baseBnb = ((percent / 100) * totalBnb).toFixed(3);
  
  // Mode-based calculations: Single heavily favors ETH, Balanced splits equally
  const eth = mode === "single" 
    ? (Number(baseEth) * 0.85).toFixed(3)
    : (Number(baseEth) * 0.5).toFixed(3);
  const bnb = mode === "single"
    ? (Number(baseBnb) * 0.15).toFixed(3)
    : (Number(baseBnb) * 0.5).toFixed(3);

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


const handlePointerDown = (e) => {
  const move = (moveEvent) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const val = Math.round(ratio * 100)
    setPct([val])
  }
  const up = () => {
    window.removeEventListener("mousemove", move)
    window.removeEventListener("mouseup", up)
    window.removeEventListener("touchmove", move)
    window.removeEventListener("touchend", up)
  }
  window.addEventListener("mousemove", move)
  window.addEventListener("mouseup", up)
  window.addEventListener("touchmove", move)
  window.addEventListener("touchend", up)
  move(e)
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

              <div
  ref={trackRef}
  className="relative w-full h-2 rounded-full bg-muted cursor-pointer my-4"
  onMouseDown={handlePointerDown}
  onTouchStart={handlePointerDown}
>
  {/* filled range */}
  <div
    className="absolute left-0 top-0 h-full rounded-full bg-orange-500"
    style={{ width: `${pct[0]}%` }}
  />
  {/* thumb */}
  <div
    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange-500 border-2 border-white/30 shadow-md"
    style={{ left: `${pct[0]}%` }}
  />
</div>

              <Tabs value={mode} onValueChange={setMode}>
                <TabsList className="grid w-full grid-cols-2 gap-3 rounded-lg p-1 h-auto bg-transparent">
                  <TabsTrigger value="single" className="rounded-lg h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Single
                  </TabsTrigger>
                  <TabsTrigger value="balanced" className="rounded-lg h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Balanced
                  </TabsTrigger>
                </TabsList>
              </Tabs>

             

              <div className="space-y-3 rounded-lg border border-border p-4">
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
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ETH → cBNB</span>
                  <span className="font-semibold">1 ETH = 5.845 cBNB</span>
                </div>
              </div>

              <div className="rounded-lg border  border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">cBNB → ETH</span>
                  <span className="font-semibold">1 cBNB = 0.171 ETH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Swap Fee</p>
                  <p className="mt-1 text-base font-semibold">0.20%</p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Price Impact</p>
                  <p className="mt-1 text-base font-semibold text-primary">
                    {(percent * 0.006).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
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
                <div className="rounded-lg border  border-border p-4">
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

                <div className="rounded-lg border border-border p-4">
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

              <div className="rounded-lg border border-border p-4">
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

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Claimable Fees</p>
                  <p className="mt-1 text-sm font-semibold">
                    🔷 {feesEth} + 🟡 {feesBnb}
                  </p>
                </div>

                <Button variant="secondary" size="sm" className="cursor-pointer rounded-lg h-10">
                  Claim
                </Button>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">LP Position Health</p>
                </div>
                <p className="mt-2 text-sm h-10">
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
            ? "border-primary bg-primary/20"
            : isCompleted
            ? "border-primary/60 bg-primary/10"
            : "border border-border bg-background hover:border-primary/40 hover:bg-primary/5"
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
            className={`h-3 w-3 rounded-full ${
              isActive || isCompleted ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        </div>

        <p className="text-sm font-medium">{item.title}</p>
      </button>
    );
  })}
</div>

        <div className="rounded-lg border  border-border bg-muted/20 p-4">
          <p className="text-xs text-muted-foreground">Current Step Summary</p>
          <p className="mt-2 text-sm font-medium">{currentStep.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-lg border  border-border p-4">
          <p className="text-xs text-muted-foreground">Withdraw %</p>
          <p className="mt-1 text-base font-semibold">{percent}%</p>
        </div>

        <div className="rounded-lg border  border-border p-4">
          <p className="text-xs text-muted-foreground">Current Step</p>
          <p className="mt-1 text-base font-semibold">{currentStep.step}</p>
        </div>

        <div className="rounded-lg border  border-border p-4">
          <p className="text-xs text-muted-foreground">ETH Output</p>
          <p className="mt-1 text-base font-semibold">{eth}</p>
        </div>

        <div className="rounded-lg border  border-border p-4">
          <p className="text-xs text-muted-foreground">cBNB Output</p>
          <p className="mt-1 text-base font-semibold">{bnb}</p>
        </div>
      </div>

      <div className="rounded-lg border  border-border p-4">
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
