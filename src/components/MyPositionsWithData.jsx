import { Info, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MyPositionsWithData = ({ onNav }) => {
  return (
    <section className="space-y-7">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">My Positions</h2>
        <p className="text-sm text-muted-foreground">
          Monitor liquidity, gains, and current market value.
        </p>
      </div>

      <Card className="max-w-115 border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Your Positions</p>
              <CardTitle className="mt-1 text-base font-semibold tracking-tight">DAI / USDC</CardTitle>
            </div>

            <Badge variant="secondary" className="rounded-full">
              1 Active
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm">
              🟡💠
            </div>

            <div className="min-w-0">
              <div className="text-sm font-semibold">DAI / USDC</div>
              <div className="truncate text-[11px] font-mono text-muted-foreground">
                Dai: 152.23351 &nbsp; USDC: 1366.86004
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="rounded-xl cursor-pointer">
              Increase Liquidity
            </Button>

            <Button variant="destructive" size="sm" className="rounded-xl cursor-pointer">
              Remove Liquidity
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Liquidity APR</span>
            <Info className="h-3.5 w-3.5" />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gains</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-destructive">
              <TrendingDown className="h-4 w-4" />
              -$1.17
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Market Value</span>

            <div className="text-right">
              <div className="text-sm font-semibold">$2,059.34</div>
              <div className="inline-flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                +$44.72
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-1 w-full rounded-2xl cursor-pointer"
            onClick={() => onNav?.("overview")}
          >
            View details
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default MyPositionsWithData;
