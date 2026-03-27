"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CandlestickChart, Sparkles, TimerReset } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StocksRealtimeChart from "./StocksRealtimeChart";
import { STOCK_INSIGHT_CARDS, STOCK_MARKET_HIGHLIGHTS, STOCK_RANGE_COPY } from "./dashboard-data";

const StocksScreen = () => {
  const [activeRange, setActiveRange] = useState("1Y");

  return (
    <section className="space-y-7">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <Badge variant="secondary" className="rounded-full">
            Stocks
          </Badge>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Stock Watch
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track multiple stocks in one place with live simulated movement and long-term range views.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {STOCK_MARKET_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border/60 bg-background/50 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      <Card className="border-border/60 bg-card shadow-sm">
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

            <div className="rounded-xl border border-border/60 bg-background/45 px-4 py-3">
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

      <div className="grid gap-6 lg:grid-cols-3">
        {STOCK_INSIGHT_CARDS.map((item) => (
          <Card key={item.title} className="border-border/60 bg-card shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-semibold tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StocksScreen;
