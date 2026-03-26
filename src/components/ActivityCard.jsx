"use client"
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import MiniLineChart from "./MiniLineChart";
import { CHART_RAW } from "./data";

const metrics = {
  income: {
    label: "Income",
    value: "$4,826.20",
    change: "+12.4%",
    dataset: "Liquidity",
  },
  expenses: {
    label: "Expenses",
    value: "$2,194.80",
    change: "+3.1%",
    dataset: "Volume",
  },
  savings: {
    label: "Savings",
    value: "$1,205.44",
    change: "+8.7%",
    dataset: "ETH",
  },
};

const ranges = ["7 Days", "30 Days", "90 Days"];

const ActivityCard = () => {
  const [activeMetric, setActiveMetric] = useState("income");
  const [activeRange, setActiveRange] = useState("30 Days");

  const currentMetric = metrics[activeMetric];

  const chartData = useMemo(() => {
    return CHART_RAW[currentMetric.dataset] || [];
  }, [currentMetric]);

  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-semibold tracking-tight">Activities</h3>
            <p className="text-sm text-muted-foreground">
              Track your monthly financial performance
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ranges.map((range) => {
              const active = activeRange === range;

              return (
                <Button
                  key={range}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  onClick={() => setActiveRange(range)}
                  className={cn(
                    "h-8 rounded-full px-3 cursor-pointer text-xs",
                    !active && "text-muted-foreground"
                  )}
                >
                  {range}
                </Button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-3">
          {Object.entries(metrics).map(([key, item]) => {
            const active = activeMetric === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMetric(key)}
                className={cn(
                  "min-w-40 rounded-2xl cursor-pointer  border p-4 text-left transition-colors",
                  "bg-background/40 hover:bg-accent/40",
                  active
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/60"
                )}
              >
                <div className="text-xs text-muted-foreground">{item.label}</div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-semibold">{item.value}</span>

                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-primary"
                    )}
                  >
                    {item.change}
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Overview</p>
              <h4 className="text-sm font-medium">{currentMetric.label}</h4>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">{activeRange}</p>
              <p className="text-sm font-medium">{currentMetric.value}</p>
            </div>
          </div>

          <div className="h-65">
            <MiniLineChart
              key={`${activeMetric}-${activeRange}`}
              data={chartData}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
