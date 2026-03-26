import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CTip from "./CTip";
import { useChartEntrance } from "@/hooks/use-chart-entrance";

export default function LiquidityBarChart({
  data,
  height = 170,
  dataKey = "value",
  xKey = "label",
}) {
  const { ref, shouldAnimate, animationKey } = useChartEntrance();
  const minHeight = typeof height === "number" ? height : 170;

  return (
    <div ref={ref} className="min-w-0 w-full" style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={minHeight}
      >
        <BarChart
          key={`liquidity-bar-${animationKey}`}
          data={data}
          margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          barCategoryGap="10%"
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border) / 0.65"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />

          <YAxis hide />

          <Tooltip
            cursor={{ fill: "hsl(var(--muted) / 0.7)" }}
            content={<CTip />}
          />

          <Bar
            dataKey={dataKey}
            radius={[12, 12, 0, 0]}
            barSize={44}
            isAnimationActive={shouldAnimate}
            animationBegin={0}
            animationDuration={750}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === data.length - 1
                    ? "var(--primary)"
                    : "var(--primary)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
