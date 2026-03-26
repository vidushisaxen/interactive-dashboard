"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import MiniLineChart from "./MiniLineChart";
import { CHART_RAW } from "./data";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

const statMeta = {
  Liquidity: { value: "24,828", sub: "Liquidity", change: "▲ 4.86%" },
  Volume: { value: "25,010", sub: "Volume", change: "▲ 3.21%" },
  ETH: { value: "5.84", sub: "ETH", change: "▲ 1.18%" },
  GEH: { value: "0.172", sub: "GEH", change: "▼ 0.84%" },
};

function PoolOverviewSkeleton() {
  return (
    <section className="space-y-7">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Skeleton className="h-[280px] w-full rounded-[28px]" />
        <Skeleton className="h-[280px] w-full rounded-[28px]" />
      </div>

      <Skeleton className="h-[460px] w-full rounded-[28px]" />
    </section>
  );
}

const PoolOverview = () => {
  const [activeChart, setActiveChart] = useState("Liquidity");
  const [activeTime, setActiveTime] = useState("1D");
  const loading = useScreenSkeleton();

  const chartData = useMemo(
    () => CHART_RAW[activeChart] || [],
    [activeChart]
  );

  const currentStat = statMeta[activeChart];

  if (loading) {
    return <PoolOverviewSkeleton />;
  }

  return (
    <section className="space-y-7">
      {/* Header */}
      <div className="space-y-1">
  <AnimatedFadeUp>
    <h2 className="text-lg font-semibold tracking-tight">
      Classic Pool
    </h2>
  </AnimatedFadeUp>

  <AnimatedFadeUp delay={0.08}>
    <p className="font-mono text-xs text-muted-foreground">
      Contract: 0x40e182...D7851d
    </p>
  </AnimatedFadeUp>
</div>

      {/* Top cards side by side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnimatedFadeUp delay={0.1}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">Pool Info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm font-medium">
                🔷 1 ETH = 🟡 5.846 cBNB
              </div>

              <div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Assets in Pool
                </p>

                <div className="space-y-3">
                  {[
                    ["50%", "🔷", "38.992 ETH"],
                    ["50%", "🟡", "227.99 cBNB"],
                  ].map(([p, ic, v], index) => (
                    <AnimatedFadeUp key={v} delay={0.12 + index * 0.06}>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 text-xs text-muted-foreground">
                          {p}
                        </span>
                        <span>{ic}</span>
                        <span className="text-muted-foreground">{v}</span>
                      </div>
                    </AnimatedFadeUp>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.16}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">Stats</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {[
                ["TVL", "$145,466.27", false],
                ["Volume (24h)", "$0", false],
                ["APR (24h)", "33.8%", true],
                ["Swap Fee (ETH → cBNB)", "0.20%", false],
                ["Swap Fee (cBNB → ETH)", "0.20%", false],
                ["LP Dividends", "50.00%", true],
              ].map(([label, value, highlight], index) => (
                <AnimatedFadeUp key={label} delay={0.18 + index * 0.05}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span
                      className={`font-medium ${
                        highlight ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                </AnimatedFadeUp>
              ))}
            </CardContent>
          </Card>
        </AnimatedFadeUp>
      </div>

      {/* Chart below */}
      <AnimatedFadeUp delay={0.22}>
        <Card>
          <CardContent className="space-y-6 pt-5">
            {/* Tabs + Filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {["Liquidity", "Volume", "ETH", "GEH"].map((t, index) => {
                  const isActive = activeChart === t;

                  return (
                    <AnimatedFadeUp key={t} delay={0.24 + index * 0.04}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveChart(t)}
                        className={`rounded-xl border-border/60 cursor-pointer transition-all duration-300 ease-in ${
                          isActive
                            ? "border-primary/40 bg-primary text-primary-foreground "
                            : "hover:bg-muted"
                        }`}
                      >
                        {t}
                      </Button>
                    </AnimatedFadeUp>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1 rounded-xl border border-border/60 p-1">
                {["1H", "4H", "1D", "1W", "1M", "6M"].map((t, index) => {
                  const isActive = activeTime === t;

                  return (
                    <AnimatedFadeUp key={t} delay={0.26 + index * 0.03}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveTime(t)}
                        className={`h-8 rounded-lg px-3 text-[11px] cursor-pointer trsnition-all duration-300 ease-in ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {t}
                      </Button>
                    </AnimatedFadeUp>
                  );
                })}
              </div>
            </div>

            {/* Stat */}
            <div className="space-y-1">
              <AnimatedTextReveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl font-semibold">
                    {currentStat.value}
                  </span>

                  <span className="text-sm text-foreground">
                    {currentStat.sub}
                  </span>

                  <span
                    className={`text-sm ${
                      currentStat.change.includes("▼")
                        ? "text-destructive"
                        : "text-primary"
                    }`}
                  >
                    {currentStat.change}
                  </span>
                </div>
              </AnimatedTextReveal>
            </div>

            <Separator />

            {/* Chart */}
            <AnimatedFadeUp delay={0.3}>
              <div className="h-60">
                <MiniLineChart
                  key={`${activeChart}-${activeTime}`}
                  data={chartData}
                />
              </div>
            </AnimatedFadeUp>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
};

export default PoolOverview;
