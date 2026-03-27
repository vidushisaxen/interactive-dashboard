"use client"
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExportCsvButton from "./ExportCsvButton";
import CTip from "./CTip";
import { LINE_DATA } from "./dashboard-data";
import { ChartCard } from "./ChartCard";
import { useChartEntrance } from "@/hooks/use-chart-entrance";

const seriesConfig = [
  {
    key: "desktop",
    label: "Desktop",
    stroke: "var(--chart-1)",
  },
  {
    key: "mobile",
    label: "Mobile",
    stroke: "var(--chart-2)",
  },
];

const LineChartMultiple = () => {
  const [show, setShow] = useState({
    desktop: true,
    mobile: true,
  });
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();

  const toggleSeries = (key) => {
    setShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ChartCard
      title="Performance Overview"
      description="Showing total visitors for the last 6 months"
      action={
        <ExportCsvButton
          fileName="quantro_line_chart_multiple"
          rows={LINE_DATA}
          className="rounded-xl"
        />
      }
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {seriesConfig.map((series) => {
            const active = show[series.key];

            return (
              <Button
                key={series.key}
                type="button"
                variant={active ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleSeries(series.key)}
                className={cn(
                  "h-9 rounded-xl px-3 cursor-pointer",
                  active && "border-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <span
                  className="mr-2 inline-block h-1.5 w-4 rounded-full"
                  style={{
                    backgroundColor: active ? series.stroke : "var(--chart-series-muted)",
                  }}
                />
                {series.label}
              </Button>
            );
          })}
        </div>

        <Badge variant="outline" className="w-fit rounded-full">
          2 Active series
        </Badge>
      </div>

      <div ref={ref} className="h-60 min-w-0 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={240}
        >
          <LineChart
            key={`line-multiple-${animationKey}`}
            data={LINE_DATA}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />

            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />

            <Tooltip content={<CTip />} />

            {show.desktop && (
              <Line
                type="monotone"
                dataKey="desktop"
                name="Desktop"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--chart-1)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
                isAnimationActive={shouldAnimate}
                animationBegin={animationDelay}
                animationDuration={750}
              />
            )}

            {show.mobile && (
              <Line
                type="monotone"
                dataKey="mobile"
                name="Mobile"
                stroke="var(--chart-2)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--chart-2)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
                isAnimationActive={shouldAnimate}
                animationBegin={animationDelay + 120}
                animationDuration={750}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default LineChartMultiple;
