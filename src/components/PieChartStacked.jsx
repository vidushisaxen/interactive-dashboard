import { useMemo, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExportCsvButton from "./ExportCsvButton";
import { PIE_DATA } from "./dashboard-data";
import ActiveShape from "./ActiveShape";
import { ChartCard } from "./ChartCard";
import { useChartEntrance } from "@/hooks/use-chart-entrance";

const PIE_SCALE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const PieChartStacked = () => {
  const [active, setActive] = useState(0);
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();

  const pieData = useMemo(
    () =>
      PIE_DATA.map((item, i) => ({
        ...item,
        fill: PIE_SCALE[i % PIE_SCALE.length],
      })),
    []
  );

  const outer = useMemo(
    () =>
      pieData.map((item, i) => ({
        ...item,
        fill: item.fill,
        opacity: i % 2 === 0 ? 0.95 : 0.72,
      })),
    [pieData]
  );

  const activeItem = pieData[active];

  return (
    <ChartCard
      title="Allocation Breakdown"
      description="Showing total distribution for the last 6 months"
      action={
        <ExportCsvButton
          fileName="quantro_pie_chart"
          rows={pieData.map((item) => ({
            name: item.name,
            value: item.value,
            fill: item.fill,
          }))}
          className="rounded-lg"
        />
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">
            {pieData.length} Segments
          </Badge>

          {activeItem ? (
            <Badge variant="outline" className="rounded-full">
              Active: {activeItem.name}
            </Badge>
          ) : null}
        </div>

        {activeItem ? (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Selected value</p>
            <p className="text-sm font-semibold">{activeItem.value}</p>
          </div>
        ) : null}
      </div>

      <div ref={ref} className="flex justify-center">
        <div className="rounded-xl border border-border/60 bg-background/40 p-4">
          <PieChart key={`pie-stacked-${animationKey}`} width={280} height={250}>
            <Pie
              data={outer}
              cx={140}
              cy={125}
              innerRadius={98}
              outerRadius={118}
              dataKey="value"
              strokeWidth={2}
              stroke="var(--border)"
              isAnimationActive={shouldAnimate}
              animationBegin={animationDelay}
              animationDuration={700}
            >
              {outer.map((entry, i) => (
                <Cell
                  key={`outer-${i}`}
                  fill={entry.fill}
                  fillOpacity={entry.opacity}
                />
              ))}
            </Pie>

            <Pie
              data={pieData}
              cx={140}
              cy={125}
              innerRadius={0}
              outerRadius={84}
              dataKey="value"
              activeIndex={active}
              activeShape={<ActiveShape />}
              onMouseEnter={(_, i) => setActive(i)}
              strokeWidth={2}
              stroke="var(--background)"
              isAnimationActive={shouldAnimate}
              animationBegin={animationDelay + 140}
              animationDuration={700}
            >
              {pieData.map((entry, i) => (
                <Cell key={`inner-${i}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {pieData.map((item, i) => {
          const isActive = active === i;

          return (
            <Button
              key={item.name}
              type="button"
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActive(i)}
              className={cn(
                "h-8 cursor-pointer rounded-full px-3 text-[11px]",
                isActive &&
                  "border border-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <span
                className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              {item.name}
            </Button>
          );
        })}
      </div>
    </ChartCard>
  );
};

export default PieChartStacked;
