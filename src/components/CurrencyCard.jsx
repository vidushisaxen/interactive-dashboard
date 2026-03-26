import { Plus, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MiniLineChart from "./MiniLineChart";
import LiquidityBarChart from "./LiquidityBarChart";

const CurrencyCard = ({
  title = "Nuance currency",
  subtitle = "Last currency Today 1 USD = 16,428.5 JPY",
  selectedCurrency = {
    code: "JPY",
    amount: "16,428.5",
    flag: "🇯🇵",
    change: "+2.14%",
  },
  items = [],
  trendData = [],
  liquidityData = [],
  activeRange = "30d",
  onRangeChange,
  onAddNew,
  onSelectCurrency,
}) => {
  return (
    <Card className="overflow-hidden border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                FX Overview
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Live
              </Badge>
            </div>

            <div>
              <CardTitle className="text-base font-semibold tracking-tight">
                {title}
              </CardTitle>
              <CardDescription className="mt-1">
                {subtitle}
              </CardDescription>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-background text-2xl">
                {selectedCurrency.flag || "💱"}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-semibold leading-none tracking-tight">
                    {selectedCurrency.amount}
                  </h3>

                  <Badge className="rounded-full">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {selectedCurrency.change || "+0.00%"}
                  </Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedCurrency.code}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={onAddNew}
            className="rounded-2xl cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Exchange trend</p>
              <h4 className="text-sm font-medium">Rate movement</h4>
            </div>

            <Tabs value={activeRange} onValueChange={onRangeChange}>
              <TabsList className="grid w-full grid-cols-3 sm:w-55">
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="h-60">
            <MiniLineChart data={trendData} />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Liquidity</p>
              <h4 className="text-sm font-medium">Market activity</h4>
            </div>

            <p className="text-xs text-muted-foreground">
              Weekly comparison
            </p>
          </div>

          <LiquidityBarChart data={liquidityData} height={170} />
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Available currencies</p>
              <h4 className="text-sm font-medium">Quick switch</h4>
            </div>

            <p className="text-xs text-muted-foreground">
              {items.length} assets
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {items.map((item) => {
              const active = item.code === selectedCurrency.code;

              return (
                <button
                  key={item.id || item.code}
                  type="button"
                  onClick={() => onSelectCurrency?.(item)}
                  className={cn(
                    "rounded-2xl border p-4 text-left cursor-pointer transition-colors",
                    "hover:bg-accent/50",
                    active
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/60 bg-background"
                  )}
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted text-lg">
                    {item.flag || "💱"}
                  </div>

                  <div className="text-base font-semibold tracking-tight">
                    {item.amount}
                  </div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.code}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;
