"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChartSpline, Layers3 } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ExportCsvButton from "./ExportCsvButton";
import MiniLineChart from "./MiniLineChart";
import {
  POOL_METRICS,
  POOL_TIME_RANGES,
  getPoolChartData,
} from "./dashboard-data";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { cn, getTrendDirection } from "@/lib/utils";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function PoolDetailsSkeleton() {
  return (
    <section className="space-y-7">
      <Skeleton className="h-9 w-32 rounded-full" />

      <div className="space-y-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-[36rem] max-w-full" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>

      <Skeleton className="h-[28rem] rounded-2xl" />
    </section>
  );
}

const metricValueFormatters = {
  AUM: (value) => `$${value.toFixed(1)}M`,
  "Net Flow": (value) => `$${value.toFixed(2)}M`,
  Price: (value) => `$${value.toFixed(2)}`,
  Yield: (value) => `${value.toFixed(2)}%`,
};

export default function PoolDetailsScreen({ pool }) {
  const [activeMetric, setActiveMetric] = useState("AUM");
  const [activeRange, setActiveRange] = useState("1D");
  const loading = useScreenSkeleton();

  const chartData = useMemo(
    () => getPoolChartData(pool, activeMetric, activeRange),
    [activeMetric, activeRange, pool]
  );

  const currentPoint = chartData.at(-1);
  const firstPoint = chartData[0];
  const delta = firstPoint?.value
    ? ((currentPoint?.value - firstPoint.value) / firstPoint.value) * 100
    : 0;
  const formattedValue =
    metricValueFormatters[activeMetric]?.(currentPoint?.value ?? 0) ?? currentPoint?.value;
  const rangeStats = pool.statsByRange?.[activeRange] || pool.statsByRange?.["1D"];

  if (loading) {
    return <PoolDetailsSkeleton />;
  }

  return (
    <section className="space-y-7">
      <AnimatedFadeUp>
        <Button asChild variant="ghost" className="rounded-full border border-border">
          <Link href="/pools">
            <ArrowLeft className="h-4 w-4" />
            Back to pools
          </Link>
        </Button>
      </AnimatedFadeUp>

      <header className="space-y-4">
        <AnimatedFadeUp>
          <Badge variant="secondary">
            {pool.type} Pool
          </Badge>
        </AnimatedFadeUp>

        <div className="space-y-2">
          <AnimatedTextReveal>
            <h1 className="text-3xl font-semibold tracking-tight">{pool.pair}</h1>
          </AnimatedTextReveal>
          <AnimatedTextReveal delay={0.08}>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              {pool.paragraph}
            </p>
          </AnimatedTextReveal>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AnimatedFadeUp delay={0.1}>
          <Card className="h-full">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  <Layers3 className="mr-1 h-3.5 w-3.5" />
                  {pool.feeTier}
                </Badge>
                <Badge className="rounded-full">
                  <ChartSpline className="mr-1 h-3.5 w-3.5" />
                  {pool.strategy}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold tracking-tight">Pool overview</CardTitle>
            </CardHeader>
            <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
              <div className="space-y-6">
                <p className="text-sm leading-6 text-muted-foreground">{pool.description}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Top holdings</p>
                    <div className="mt-3 space-y-2">
                      {pool.topHoldings.map((holding) => (
                        <div key={holding} className="flex items-center justify-between text-sm">
                          <span>{holding}</span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Snapshot</p>
                    <div className="mt-3 space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Benchmark</span>
                        <span className="font-medium">{pool.benchmark}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Risk</span>
                        <span className="font-medium">{pool.riskLevel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Rebalance</span>
                        <span className="font-medium">{pool.rebalance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Manager</span>
                        <span className="font-medium">{pool.manager}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.16}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold tracking-tight">Current info</CardTitle>
            </CardHeader>
            <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
              <div className="space-y-3">
	                {[
	                  ["Assets under management", rangeStats.aum],
	                  ["Net flow", rangeStats.flow],
	                  ["Return", rangeStats.return],
	                  ["Drawdown", rangeStats.drawdown],
	                  ["Benchmark", pool.benchmark],
	                  ["Category", pool.feeTier],
	                ].map(([label, value], index) => (
	                  <AnimatedFadeUp key={label} delay={0.18 + index * 0.04}>
	                    <div className="flex items-center justify-between gap-4 text-sm">
	                      <span className="text-muted-foreground">{label}</span>
	                      <span
	                        className={cn(
	                          "font-medium",
	                          (label === "Return" || label === "Drawdown") &&
	                            getTrendDirection(value) === "up" &&
	                            "text-(--status-success)",
	                          (label === "Return" || label === "Drawdown") &&
	                            getTrendDirection(value) === "down" &&
	                            "text-(--status-danger)"
	                        )}
	                      >
	                        {value}
	                      </span>
	                    </div>
	                  </AnimatedFadeUp>
	                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>
      </div>

      <AnimatedFadeUp delay={0.22}>
        <Card>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {POOL_METRICS.map((metric) => {
                    const isActive = activeMetric === metric;

                    return (
                      <Button
                        key={metric}
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveMetric(metric)}
                        className={`rounded-lg border border-border transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        {metric}
                      </Button>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <AnimatedTextReveal>
                    <div className="flex flex-wrap items-center gap-2">
	                      <span className="text-3xl font-semibold tracking-tight">{formattedValue}</span>
	                      <span
	                        className={cn(
	                          "text-sm",
	                          delta >= 0 ? "text-(--status-success)" : "text-(--status-danger)"
	                        )}
	                      >
	                        {delta >= 0 ? "+" : ""}
	                        {delta.toFixed(2)}%
	                      </span>
                      <span className="text-sm text-muted-foreground">{activeRange} view</span>
                    </div>
                  </AnimatedTextReveal>
                  <p className="text-sm text-muted-foreground">
                    Dynamic chart for {pool.pair}, generated from the selected metric and time range.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 rounded-lg border border-border p-1">
                {POOL_TIME_RANGES.map((range) => {
                  const isActive = activeRange === range;

                  return (
                    <Button
                      key={range}
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveRange(range)}
                      className={`h-8 rounded-md px-3 text-xs ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {range}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <ExportCsvButton
                fileName={`${pool.slug}_${activeMetric.toLowerCase().replace(/\s+/g, "_")}_${activeRange.toLowerCase()}`}
                rows={chartData}
                className="rounded-lg"
              />
            </div>

            <Separator />

            <div className="h-72">
              <MiniLineChart key={`${pool.slug}-${activeMetric}-${activeRange}`} data={chartData} />
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
}
