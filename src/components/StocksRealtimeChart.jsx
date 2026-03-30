"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CTip from "./CTip";
import { useChartEntrance } from "@/hooks/use-chart-entrance";
import ExportCsvButton from "./ExportCsvButton";
import { STOCK_RANGE_CONFIG, STOCK_SERIES } from "./dashboard-data";

function roundValue(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function seededNoise(seed, step) {
  const value = Math.sin(seed * 97.13 + step * 12.37) * 43758.5453;
  return value - Math.floor(value);
}

function createPriceSeries(rangeKey, series) {
  const config = STOCK_RANGE_CONFIG[rangeKey];
  const points = [];
  const total = config.labels.length;
  let current = series.base;

  config.labels.forEach((label, index) => {
    const trend = series.base * 0.0019 * config.driftScale * series.drift;
    const cycleA = Math.sin((index + 1) * (0.45 + series.volatility * 0.06)) * series.base * 0.0024 * config.volatilityScale;
    const cycleB = Math.cos((index + 1) * (0.22 + series.drift * 0.08)) * series.base * 0.0016 * config.volatilityScale;
    const noise = (seededNoise(series.base, index + 1) - 0.5) * series.base * 0.0045 * config.volatilityScale * series.volatility;
    const selloff = index % 11 === 0 ? -series.base * 0.0032 * series.volatility : 0;
    const rebound = index % 13 === 0 ? series.base * 0.0028 * series.drift : 0;

    current = Math.max(
      current + trend + cycleA + cycleB + noise + selloff + rebound,
      series.base * 0.55
    );

    points.push({
      label,
      price: roundValue(current),
      indexValue: roundValue((current / series.base) * 100, 2),
      tick: index === total - 1,
    });
  });

  return points;
}

function buildPriceMap(rangeKey) {
  return STOCK_SERIES.reduce((acc, series) => {
    acc[series.key] = createPriceSeries(rangeKey, series);
    return acc;
  }, {});
}

function buildChartData(rangeKey, priceMap, liveTick) {
  const config = STOCK_RANGE_CONFIG[rangeKey];
  const total = config.labels.length;

  return config.labels.map((label, index) => {
    const point = { label };
    const isTailPoint = index >= total - config.liveTail;
    const tailProgress = isTailPoint
      ? (index - (total - config.liveTail) + 1) / config.liveTail
      : 0;

    STOCK_SERIES.forEach((series, seriesIndex) => {
      const seriesPoint = priceMap[series.key][index];
      const pulse =
        isTailPoint
          ? Math.sin(liveTick * 0.8 + seriesIndex * 1.4 + index * 0.45) *
            series.volatility *
            tailProgress *
            0.95
          : 0;

      point[series.key] = roundValue(seriesPoint.indexValue + pulse, 2);
      point[`${series.key}Price`] = roundValue(
        Math.max(seriesPoint.price + pulse * (series.base / 100), series.base * 0.55)
      );
    });

    return point;
  });
}

const StocksRealtimeChart = ({ activeRange, onRangeChange }) => {
  const [visibleSeries, setVisibleSeries] = useState(() =>
    STOCK_SERIES.reduce((acc, item) => ({ ...acc, [item.key]: item.key === 'nvda' }), {})
  );
  const [liveTick, setLiveTick] = useState(0);
  const { ref, shouldAnimate, animationKey, animationDelay } = useChartEntrance();

  const priceMap = useMemo(() => buildPriceMap(activeRange), [activeRange]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveTick((prev) => prev + 1);
    }, 1200);

    return () => window.clearInterval(intervalId);
  }, [activeRange]);

  const chartData = useMemo(
    () => buildChartData(activeRange, priceMap, liveTick),
    [activeRange, liveTick, priceMap]
  );

  const stockSummary = useMemo(() => {
    const firstPoint = chartData[0];
    const lastPoint = chartData.at(-1);

    return STOCK_SERIES.map((item) => {
      const start = firstPoint?.[`${item.key}Price`] ?? item.base;
      const current = lastPoint?.[`${item.key}Price`] ?? item.base;
      const change = ((current - start) / start) * 100;

      return {
        ...item,
        current: roundValue(current),
        change: roundValue(change),
      };
    });
  }, [chartData]);

  const exportRows = useMemo(
    () =>
      chartData.map((point) =>
        STOCK_SERIES.reduce(
          (acc, series) => {
            acc[`${series.label}_index`] = point[series.key];
            acc[`${series.label}_price`] = point[`${series.key}Price`];
            return acc;
          },
          { label: point.label, range: activeRange }
        )
      ),
    [activeRange, chartData]
  );

  const toggleSeries = (key) => {
    setVisibleSeries((prev) => {
      const newVisible = {
        ...prev,
        [key]: !prev[key],
      };

      // Ensure at least one series remains active
      const activeCount = Object.values(newVisible).filter(Boolean).length;
      if (activeCount === 0) {
        // If trying to turn off the last active series, keep it active
        return prev;
      }

      return newVisible;
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {Object.keys(STOCK_RANGE_CONFIG).map((rangeKey) => {
          const active = activeRange === rangeKey;

          return (
            <Button
              key={rangeKey}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              onClick={() => onRangeChange(rangeKey)}
              className={cn("rounded-full px-3 cursor-pointer", !active && "text-muted-foreground")}
            >
              {rangeKey}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1">
        {stockSummary.map((stock, index) => {
          const active = visibleSeries[stock.key];

          return (
            <div key={index}>
              <button
                key={stock.key}
                type="button"
                onClick={() => toggleSeries(stock.key)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-colors cursor-pointer flex-1 min-w-0",
                  active
                    ? "bg-primary border-primary"
                    : "border-border bg-background/40 hover:bg-primary/20 hover:text-primary"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={cn("text-xs uppercase tracking-widest", active ? "text-primary-foreground" : "text-muted-foreground")}>
                      {stock.label}
                    </p>
                    <p className={cn("mt-1 text-sm font-medium", active ? "text-primary-foreground" : "")}>{stock.name}</p>
                  </div>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: stock.stroke }}
                  />
                </div>
                <p className={cn("mt-4 text-2xl font-semibold tracking-tight", active ? "text-primary-foreground" : "")}>
                  ${stock.current}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs font-medium",
                    stock.change >= 0
                      ? "text-[var(--status-success)]"
                      : "text-destructive"
                  )}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change}%
                </p>
              </button>
              {index < stockSummary.length - 1 && <span className="w-1" />}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <ExportCsvButton
          fileName={`quantro_stocks_${activeRange.toLowerCase()}`}
          rows={exportRows}
          className="rounded-full"
        />
      </div>

      <div
        ref={ref}
        className="h-[380px] min-w-0 rounded-[28px] border border-border bg-background/40 p-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            key={`stocks-${activeRange}-${animationKey}`}
            data={chartData}
            margin={{ top: 12, right: 10, left: -12, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="label"
              minTickGap={18}
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
              tickFormatter={(value) => `${value}%`}
              domain={["dataMin - 4", "dataMax + 4"]}
            />

            <Tooltip
              content={
                <CTip
                  valueFormatter={(value, item) => {
                    const price = item?.payload?.[`${item.dataKey}Price`];
                    return `${Number(value).toFixed(2)}%${price ? ` • $${Number(price).toFixed(2)}` : ""}`;
                  }}
                />
              }
            />

            {STOCK_SERIES.map((series, index) =>
              visibleSeries[series.key] ? (
                <Line
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  name={series.label}
                  stroke={series.stroke}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: series.stroke,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationDelay + index * 120}
                  animationDuration={760}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StocksRealtimeChart;
