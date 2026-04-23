"use client";

import LineChartMultiple from "./LinechartMultiple";
import PieChartStacked from "./PieChartStacked";
import RadarChartGrid from "./RadarChartGrid";
import RadialChartLabel from "./RadialChartLabel";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AnimatedFadeUp,
  AnimatedTextReveal,
} from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

function AnalyticsChartCardSkeleton() {
  return (
    <div className="h-full rounded-xl border border-border/35 bg-card p-6 shadow-none">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56 max-w-full" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-80 w-full rounded-lg md:h-96" />
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="flex-1 space-y-7">
      <header className="space-y-3">
        <Skeleton className="h-6 w-24 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-56 max-w-full" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsChartCardSkeleton />
        <AnalyticsChartCardSkeleton />
        <AnalyticsChartCardSkeleton />
        <AnalyticsChartCardSkeleton />
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
      <header className="space-y-3">
        <AnimatedFadeUp>
          <Badge
            variant="secondary"
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

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnimatedFadeUp delay={0.1}>
          <LineChartMultiple className="h-full" isActive={true} />
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.15}>
          <PieChartStacked className="h-full" />
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.2}>
          <RadarChartGrid className="h-full" />
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.25}>
          <RadialChartLabel className="h-full" />
        </AnimatedFadeUp>
      </section>
    </div>
  );
};

export default AnalyticsPage;
