"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExportCsvButton from "./ExportCsvButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import MiniLineChart from "./MiniLineChart";
import { CHART_RAW, sliceChartDataByRange } from "./dashboard-data";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function PoolOverviewSkeleton() {
  return (
    <section className="space-y-7">
      {/* HEADER */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-28 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        
        {/* Pool Info */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <Skeleton className="h-5 w-28" />

          <Skeleton className="h-4 w-40" />

          <div className="space-y-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <Skeleton className="h-5 w-20 mb-2" />

          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* CHART CARD */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        
        {/* Tabs + filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-lg" />
            ))}
          </div>

          <div className="flex flex-wrap gap-1 border border-border p-1 rounded-lg">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <Skeleton key={i} className="h-8 w-10 rounded-md" />
            ))}
          </div>
        </div>

        {/* Stat */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Export button */}
        <div className="flex justify-end">
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Chart */}
        <Skeleton className="h-56 w-full rounded-lg" />
      </div>
    </section>
  );
}

const PoolOverview = () => {
  const [activeChart, setActiveChart] = useState("Liquidity");
  const [activeTime, setActiveTime] = useState("1D");
  const loading = useScreenSkeleton();

  const chartData = useMemo(
    () => sliceChartDataByRange(CHART_RAW[activeChart] || [], activeTime),
    [activeChart, activeTime]
  );

  const currentStat = useMemo(() => {
    if (!chartData || !chartData.length) {
      return { value: "--", sub: activeChart, change: "" };
    }

    const first = Number(chartData[0]?.value || 0);
    const last = Number(chartData.at(-1)?.value || 0);
    const changePercent = first === 0 ? 0 : ((last - first) / first) * 100;

    return {
      value:
        activeChart === "ETH" || activeChart === "GEH"
          ? last.toFixed(2)
          : last.toLocaleString(),
      sub: activeChart,
      change: first === 0
        ? ""
        : `${last >= first ? "▲" : "▼"} ${Math.abs(changePercent).toFixed(2)}%`,
    };
  }, [activeChart, chartData]);

  // Dynamic stats based on activeTime
  const statsData = {
    "1H": {
      tvl: "$145,466.27",
      volume: "$0",
      apr: "33.8%",
      swapFeeEth: "0.20%",
      swapFeeCbnb: "0.20%",
      lpDividends: "50.00%",
    },
    "4H": {
      tvl: "$145,500.00",
      volume: "$1,200",
      apr: "34.2%",
      swapFeeEth: "0.21%",
      swapFeeCbnb: "0.21%",
      lpDividends: "50.10%",
    },
    "1D": {
      tvl: "$145,466.27",
      volume: "$0",
      apr: "33.8%",
      swapFeeEth: "0.20%",
      swapFeeCbnb: "0.20%",
      lpDividends: "50.00%",
    },
    "1W": {
      tvl: "$146,000.00",
      volume: "$15,000",
      apr: "35.5%",
      swapFeeEth: "0.22%",
      swapFeeCbnb: "0.22%",
      lpDividends: "50.50%",
    },
    "1M": {
      tvl: "$150,000.00",
      volume: "$50,000",
      apr: "38.0%",
      swapFeeEth: "0.25%",
      swapFeeCbnb: "0.25%",
      lpDividends: "51.00%",
    },
    "6M": {
      tvl: "$160,000.00",
      volume: "$200,000",
      apr: "42.0%",
      swapFeeEth: "0.30%",
      swapFeeCbnb: "0.30%",
      lpDividends: "52.00%",
    },
  };

  const currentStats = statsData[activeTime] || statsData["1D"];

  if (loading) {
    return <PoolOverviewSkeleton />;
  }

  return (
    <section className="space-y-7">
      {/* Header */}
      <div className="space-y-3">
        <AnimatedFadeUp>
          <Badge variant="secondary">
            Classic Pool
          </Badge>
        </AnimatedFadeUp>
        <div className="space-y-1">
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">
              Classic Pool
            </h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Contract: 0x40e182...D7851d
            </p>
          </AnimatedTextReveal>
        </div>
      </div>

      {/* Top cards side by side */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnimatedFadeUp delay={0.1}>
          <Card className="h-full border border-border shadow-sm  ">
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
          <Card className="h-full border border-border shadow-sm ">
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">Stats</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {[
                ["TVL", currentStats.tvl, false],
                ["Volume (24h)", currentStats.volume, false],
                ["APR (24h)", currentStats.apr, true],
                ["Swap Fee (ETH → cBNB)", currentStats.swapFeeEth, false],
                ["Swap Fee (cBNB → ETH)", currentStats.swapFeeCbnb, false],
                ["LP Dividends", currentStats.lpDividends, true],
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
        <Card className="border border-border shadow-sm">
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
                        className={`rounded-lg  border border-border cursor-pointer transition-all duration-300 ease-in ${
                          isActive
                            ? "border-primary/40 bg-primary text-primary-foreground "
                            : "hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        {t}
                      </Button>
                    </AnimatedFadeUp>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1 rounded-lg border  border-border p-1">
                {["1H", "4H", "1D", "1W", "1M", "6M"].map((t, index) => {
                  const isActive = activeTime === t;

                  return (
                    <AnimatedFadeUp key={t} delay={0.26 + index * 0.03}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveTime(t)}
                        className={`h-8 cursor-pointer rounded-md px-3 text-xs transition-all duration-300 ease-in ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary hover:text-primary-foreground"
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

            <div className="flex justify-end">
              <ExportCsvButton
                fileName={`quantro_pool_overview_${activeChart.toLowerCase()}_${activeTime.toLowerCase()}`}
                rows={chartData}
                className="rounded-lg"
              />
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
