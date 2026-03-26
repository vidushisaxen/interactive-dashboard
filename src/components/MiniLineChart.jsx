import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

import CTip from "./CTip";
import { useChartEntrance } from "@/hooks/use-chart-entrance";

const MiniLineChart = ({
  data = [],
  dataKey = "value",
  xKey = "label",
  height = "100%",
}) => {
  const { ref, shouldAnimate, animationKey } = useChartEntrance();

  if (!data?.length) {
    return (
      <div className="flex h-full min-h-45 items-center justify-center rounded-2xl border border-border/60 bg-background/40 text-sm text-muted-foreground">
        No chart data available
      </div>
    );
  }

  const values = data
    .map((item) => Number(item?.[dataKey]))
    .filter((value) => Number.isFinite(value));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const padding = range > 0 ? range * 0.18 : Math.max(max * 0.08, 1);
  const minHeight = typeof height === "number" ? height : 180;

  return (
    <div ref={ref} className="h-full min-w-0 w-full" style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={minHeight}
      >
        <LineChart
          key={`mini-line-${animationKey}`}
          data={data}
          margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="mini-line-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5f00" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#ff5f00" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="var(--border) / 0.7"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={24}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />

          <YAxis
            hide
            domain={[min - padding, max + padding]}
          />

          <Tooltip
            content={<CTip />}
            cursor={{ stroke: "var(--primary)", strokeWidth: 1 }}
          />

          <Area
            type="linear"
            dataKey={dataKey}
            stroke="none"
            fill="url(#mini-line-fill)"
            isAnimationActive={shouldAnimate}
            animationBegin={0}
            animationDuration={700}
          />

          <Line
            type="linear"
            dataKey={dataKey}
            stroke="var(--primary)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5,
              fill: "var(--primary)",
              stroke: "var(--background)",
              strokeWidth: 2,
            }}
            isAnimationActive={shouldAnimate}
            animationBegin={120}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniLineChart;
