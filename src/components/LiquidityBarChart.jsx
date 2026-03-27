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
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();
  const minHeight = typeof height === "number" ? height : 170;
  const barSize =
    data.length >= 18 ? 40 : data.length >= 14 ? 45 : data.length >= 10 ? 50 : 60;

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
          margin={{ top: 8, right: 0, left: -8, bottom: 0 }}
          barCategoryGap="2%"
          width={40}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--chart-grid-strong)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={10}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />

          <YAxis hide />

          <Tooltip
            cursor={{ fill: "var(--chart-cursor)" }}
            content={<CTip />}
          />

          <Bar
            dataKey={dataKey}
            radius={[12, 12, 0, 0]}
            barSize={barSize}
            isAnimationActive={shouldAnimate}
            animationBegin={animationDelay}
            animationDuration={750}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === data.length - 1
                    ? "var(--chart-1)"
                    : "var(--chart-1)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
