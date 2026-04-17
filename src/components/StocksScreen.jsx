"use client";

import { useState } from "react";
import { ArrowUpRight, CandlestickChart, Sparkles, TimerReset } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StocksRealtimeChart from "./StocksRealtimeChart";
import { STOCK_INSIGHT_CARDS, STOCK_MARKET_HIGHLIGHTS, STOCK_RANGE_COPY } from "./dashboard-data";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function StocksSkeleton() {
  return (
    <section className="space-y-7">
      {/* HEADER */}
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* market highlights */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-background/50 px-4 py-3"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-1 h-4 w-16" />
            </div>
          ))}
        </div>
      </header>

      {/* CHART CARD */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-6 space-y-6">
          
          {/* header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <div className="rounded-lg border border-border bg-background/40 p-4 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          {/* range buttons */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Skeleton key={i} className="h-8 w-14 rounded-full" />
            ))}
          </div>

          {/* stock cards row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border p-4 space-y-3"
              >
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-3 w-3 rounded-full" />
                </div>

                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>

          {/* export button */}
          <div className="flex justify-end">
            <Skeleton className="h-9 w-36 rounded-lg" />
          </div>

          {/* chart */}
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid gap-6 lg:grid-cols-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-3"
          >
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
}

const StocksScreen = () => {
  const [activeRange, setActiveRange] = useState("1Y");
  const loading = useScreenSkeleton();

  if (loading) {
    return <StocksSkeleton />;
  }

  return (
    <section className="space-y-7">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <AnimatedFadeUp>
            <Badge variant="secondary">
              Stocks
            </Badge>
          </AnimatedFadeUp>
          <div className="space-y-1">
            <AnimatedTextReveal>
              <h1 className="text-2xl font-semibold tracking-tight">
                Stock Watch
              </h1>
            </AnimatedTextReveal>
            <AnimatedTextReveal delay={0.08}>
              <p className="mt-1 text-sm text-muted-foreground">
                Track multiple stocks in one place with live simulated movement and long-term range views.
              </p>
            </AnimatedTextReveal>
          </div>
        </div>

        <AnimatedFadeUp delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-3">
            {STOCK_MARKET_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border  border-border bg-background/50 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </AnimatedFadeUp>
      </header>

      <AnimatedFadeUp delay={0.15}>
        <Card className=" border border-border bg-card shadow-sm">
          <CardHeader className="gap-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    <CandlestickChart className="mr-1 h-3.5 w-3.5" />
                    Multi-stock chart
                  </Badge>
                  <Badge className="rounded-full">
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    Live updates
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Quantro Stock Signals
                </CardTitle>
                <CardDescription>
                  {STOCK_RANGE_COPY[activeRange]}
                </CardDescription>
              </div>

              <div className="rounded-lg border border-border bg-background/45 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TimerReset className="h-4 w-4 text-primary" />
                  Refreshing live
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Last data point updates randomly to simulate real-time price flow.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <StocksRealtimeChart
              activeRange={activeRange}
              onRangeChange={setActiveRange}
            />
          </CardContent>
        </Card>
      </AnimatedFadeUp>

      <AnimatedFadeUp delay={0.2}>
        <div className="grid gap-6 lg:grid-cols-3">
          {STOCK_INSIGHT_CARDS.map((item) => (
            <Card key={item.title} className=" border border-border bg-card shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-semibold tracking-tight">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
                <a href="#" className="mt-4 cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors relative group">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedFadeUp>
    </section>
  );
}


export default StocksScreen;
