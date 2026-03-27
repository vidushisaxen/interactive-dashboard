"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedFadeUp, AnimatedTextReveal, fadeUp } from "@/lib/animations";
import { motion } from "motion/react";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import ExportCsvButton from "./ExportCsvButton";

import { POOLS } from "./dashboard-data";

const typeVariantMap = {
  Classic: "secondary",
  Stable: "outline",
  Weighted: "secondary",
};

const formatCurrency = (n) =>
  n >= 1e6
    ? `$${(n / 1e6).toFixed(2)}M`
    : `$${n.toLocaleString("en", { maximumFractionDigits: 1 })}`;

function PoolsListSkeleton() {
  return (
    <section className="space-y-7">
      <header className="space-y-3">
        <Skeleton className="h-6 w-18 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
      </header>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 rounded-2xl px-5 py-5 lg:grid-cols-5"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 -ml-4 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20 lg:ml-auto" />
            <Skeleton className="h-4 w-16 lg:ml-auto" />
            <Skeleton className="h-4 w-16 lg:ml-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PoolPair({ pool }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm shadow-sm">
          {pool.token0Icon}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm shadow-sm">
          {pool.token1Icon}
        </div>
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{pool.pair}</div>
        <div className="truncate text-xs text-muted-foreground">
          Fee {pool.feeTier}
        </div>
      </div>
    </div>
  );
}

const PoolsList = ({ onSelectPool }) => {
  const loading = useScreenSkeleton();

  if (loading) {
    return <PoolsListSkeleton />;
  }

  return (
    <section className="space-y-7">
      <header className="space-y-3">
        <AnimatedFadeUp>
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs uppercase tracking-widest"
          >
            Pools
          </Badge>
        </AnimatedFadeUp>

        <div className="space-y-1">
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">Pools</h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Browse active liquidity pools with more realistic market size, volume, and APR.
            </p>
          </AnimatedTextReveal>
        </div>
      </header>

      <AnimatedFadeUp delay={0.08}>
        <Card className="border-transparent! bg-transparent shadow-none">
          <CardContent className="px-0 py-0 border-transparent">
            <div className="mb-3 flex justify-end">
              <ExportCsvButton
                fileName="quantro_pools"
                rows={POOLS.map((pool) => ({
                  pair: pool.pair,
                  type: pool.type,
                  fee_tier: pool.feeTier,
                  liquidity: pool.liquidity,
                  volume_24h: pool.volume24h,
                  apr: pool.apr,
                }))}
                className="rounded-lg"
              />
            </div>

            <div className="mb-3 hidden rounded-2xl bg-background/35 px-5 py-4 text-xs uppercase tracking-widest text-muted-foreground lg:grid lg:grid-cols-5">
              <span>Pool</span>
              <span>Type</span>
              <span className="text-right">Liquidity</span>
              <span className="text-right">Volume</span>
              <span className="text-right">APR</span>
            </div>

            <div className="space-y-4">
              {POOLS.map((pool, index) => (
                <motion.button
                  key={pool.id}
                  type="button"
                  variants={fadeUp(20, 0.46, 0.06 + index * 0.04)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  onClick={() => onSelectPool?.(pool)}
                  className="grid w-full grid-cols-1 gap-4 rounded-2xl bg-card/92 px-5 py-5 text-left transition-colors hover:bg-accent/30 lg:grid-cols-5 lg:items-center"
                >
                  <PoolPair pool={pool} />

                  <div>
                    <Badge
                      variant={typeVariantMap[pool.type] || "outline"}
                      className="rounded-full"
                    >
                      {pool.type}
                    </Badge>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                      Liquidity
                    </p>
                    <p className="text-sm font-medium">{formatCurrency(pool.liquidity)}</p>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                      Volume
                    </p>
                    <p className="text-sm font-medium">{pool.volume24h}</p>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                      APR
                    </p>
                    <span
                      className={
                        pool.apr
                          ? "text-sm font-semibold text-primary"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {pool.apr ? `${pool.apr}%` : "--%"}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
};

export default PoolsList;
