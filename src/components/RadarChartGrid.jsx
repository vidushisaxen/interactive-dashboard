import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import ExportCsvButton from "./ExportCsvButton";
import { RADAR_DATA } from "./dashboard-data";
import CTip from "./CTip";
import { ChartCard } from "./ChartCard";
import { useChartEntrance } from "@/hooks/use-chart-entrance";

const RadarChartGrid = () => {
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();
  const average =
    Math.round(
      RADAR_DATA.reduce((sum, item) => sum + (item.desktop || 0), 0) /
        Math.max(RADAR_DATA.length, 1)
    ) || 0;

  return (
    <ChartCard
      title="Radar Performance"
      description="Showing total visitors for the last 6 months"
      action={
        <ExportCsvButton
          fileName="quantro_radar_chart"
          rows={RADAR_DATA}
          className="rounded-lg"
        />
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">
            1 Active metric
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Avg: {average}
          </Badge>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Tracked dimension</p>
          <p className="text-sm font-medium">Desktop Visitors</p>
        </div>
      </div>

      <div ref={ref} className="min-w-0 rounded-xl border border-border/60 bg-background/40 p-4">
        <ResponsiveContainer
          width="100%"
          height={250}
          minWidth={0}
          minHeight={250}
        >
          <RadarChart
            key={`radar-grid-${animationKey}`}
            data={RADAR_DATA}
            margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
          >
            <PolarGrid
              gridType="circle"
              stroke="var(--chart-grid)"
            />

            <PolarAngleAxis
              dataKey="month"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, 300]}
              tick={{ fill: "var(--chart-series-muted)", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />

            <Radar
              name="Visitors"
              dataKey="desktop"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.16}
              strokeWidth={2.5}
              dot={{ fill: "var(--chart-1)", r: 3 }}
              activeDot={{
                fill: "var(--chart-1)",
                r: 5,
              }}
              isAnimationActive={shouldAnimate}
              animationBegin={animationDelay}
              animationDuration={800}
            />

            <Tooltip content={<CTip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default RadarChartGrid;
