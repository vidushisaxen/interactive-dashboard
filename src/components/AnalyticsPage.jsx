"use client";

import LineChartMultiple from "./LinechartMultiple";
import PieChartStacked from "./PieChartStacked";
import RadarChartGrid from "./RadarChartGrid";
import RadialChartLabel from "./RadialChartLabel";

import { Badge } from "@/components/ui/badge";
import { ChartCard } from "./ChartCard";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AnimatedFadeUp,
  AnimatedTextReveal,
} from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function AnalyticsSkeleton() {
  return (
    <div className="flex-1 space-y-7">
      <header className="space-y-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Skeleton className="h-[430px] w-full rounded-[28px]" />
        <Skeleton className="h-[430px] w-full rounded-[28px]" />
        <Skeleton className="h-[430px] w-full rounded-[28px]" />
        <Skeleton className="h-[430px] w-full rounded-[28px]" />
      </section>
    </div>
  );
}

const AnalyticsPage = () => {
  const loading = useScreenSkeleton();

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="flex-1 space-y-7">
      
      {/* ---------------- HEADER ---------------- */}
      <header className="space-y-3">
        
        <AnimatedFadeUp>
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs uppercase tracking-widest"
          >
            Analytics
          </Badge>
        </AnimatedFadeUp>

        <div className="space-y-1">
          
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">
              Pool Analytics
            </h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Interactive charts — January to June 2024
            </p>
          </AnimatedTextReveal>

        </div>
      </header>

      {/* ---------------- CHART GRID ---------------- */}
      <section className="grid grid-cols-2 gap-6">
        <AnimatedFadeUp delay={0.1}>
          <div className="h-full">
            <ChartCard
              className="h-full"
              title="Performance Trends"
              description="Multi-series comparison over time"
            >
              <LineChartMultiple isActive={true}/>
            </ChartCard>
          </div>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.15}>
          <div className="h-full">
            <ChartCard
              className="h-full"
              title="Distribution Breakdown"
              description="Category share and proportional split"
            >
              <PieChartStacked />
            </ChartCard>
          </div>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.2}>
          <div className="h-full">
            <ChartCard
              className="h-full"
              title="Metric Coverage"
              description="Comparative strength across dimensions"
            >
              <RadarChartGrid />
            </ChartCard>
          </div>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.25}>
          <div className="h-full">
            <ChartCard
              className="h-full"
              title="Completion Overview"
              description="Focused radial performance summary"
            >
              <RadialChartLabel />
            </ChartCard>
          </div>
        </AnimatedFadeUp>
      </section>
    </div>
  );
};

export default AnalyticsPage;
