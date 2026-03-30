"use client"
import { useMemo, useState } from "react";
import { Cell, RadialBar, RadialBarChart, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RADIAL_DATA } from "./dashboard-data";
import { ChartCard } from "./ChartCard";
import { useChartEntrance } from "@/hooks/use-chart-entrance";
import ExportCsvButton from "./ExportCsvButton";

const RADIAL_SCALE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const RadialTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div className="rounded-lg border  border border-border bg-popover/95 px-3 py-2 text-popover-foreground shadow-md backdrop-blur">
      <div
        className="text-xs font-semibold"
        style={{ color: item.fill }}
      >
        {item.name}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Visitors:{" "}
        <span className="font-semibold text-foreground">
          {item.visitors.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const RadialChartLabel = () => {
  const [hovered, setHovered] = useState(null);
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();

  const radialData = useMemo(
    () =>
      RADIAL_DATA.map((item, i) => ({
        ...item,
        fill: RADIAL_SCALE[i % RADIAL_SCALE.length],
      })),
    []
  );

  const total = radialData.reduce((sum, item) => sum + item.visitors, 0);
  const activeItem = hovered !== null ? radialData[hovered] : null;

  return (
    <ChartCard
      title="Traffic Breakdown"
      description="Showing total visitors for the last 6 months"
      action={
        <ExportCsvButton
          fileName="quantro_radial_chart"
          rows={radialData.map((item) => ({
            source: item.name,
            visitors: item.visitors,
          }))}
          className="rounded-lg"
        />
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">
            {radialData.length} Sources
          </Badge>

          <Badge variant="outline" className="rounded-full">
            Total: {total.toLocaleString()}
          </Badge>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Focused source</p>
          <p className="text-sm font-medium">
            {activeItem ? activeItem.name : "All channels"}
          </p>
        </div>
      </div>

      <div ref={ref} className="rounded-lg border  border border-border bg-background/40 p-4">
        <div className="relative flex justify-center">
          <RadialBarChart
            key={`radial-chart-${animationKey}`}
            width={260}
            height={260}
            cx={130}
            cy={130}
            innerRadius={34}
            outerRadius={114}
            data={[...radialData].reverse()}
            startAngle={90}
            endAngle={-270}
            barSize={14}
            barGap={4}
          >
            <RadialBar
              minAngle={15}
              dataKey="visitors"
              cornerRadius={8}
              background={{ fill: "var(--chart-ring-bg)" }}
              onMouseLeave={() => setHovered(null)}
              isAnimationActive={shouldAnimate}
              animationBegin={animationDelay}
              animationDuration={850}
            >
              {radialData.map((item, i) => {
                const reversedIndex = radialData.length - 1 - i;
                const dimmed =
                  hovered !== null && hovered !== reversedIndex;

                return (
                  <Cell
                    key={item.name}
                    fill={item.fill}
                    fillOpacity={dimmed ? 0.28 : 1}
                    onMouseEnter={() => setHovered(reversedIndex)}
                  />
                );
              })}
            </RadialBar>

            <Tooltip content={<RadialTooltip />} />
          </RadialBarChart>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold tracking-tight">
              {activeItem
                ? activeItem.visitors.toLocaleString()
                : total.toLocaleString()}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {activeItem ? activeItem.name : "Visitors"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {radialData.map((item, i) => {
          const active = hovered === i;

          return (
            <button
              key={item.name}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={cn(
                "flex w-full items-center cursor-pointer justify-between rounded-lg border px-3 py-2 text-left transition-colors",
                active
                  ? "border-primary/20 bg-primary/10"
                  : "border-transparent hover:bg-accent/40"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-2.5 w-2.5 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold">
                {item.visitors.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </ChartCard>
  );
};

export default RadialChartLabel;
