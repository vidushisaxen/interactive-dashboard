import { ArrowUpRight, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PieChartStacked from "./PieChartStacked";

const PromoCard = ({
  title = "Smart Insights",
  subtitle = "AI-powered recommendations based on your recent spending habits",
  cta = "Explore insights",
  badge = "New",
  savings = "$482.40",
  onExplore,
  onGenerate,
}) => {
  return (
    <Card className="relative overflow-hidden border-border/60 bg-[linear-gradient(135deg,var(--background)_0%,var(--card)_45%,var(--muted)/0.65_100%)] shadow-sm">
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

      <CardContent className="relative z-10 space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="w-fit rounded-full">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {badge}
            </Badge>

            <div>
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 max-w-[320px] text-sm leading-6 text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onGenerate}
            className="h-10 w-10 rounded-2xl bg-background/60 cursor-pointer backdrop-blur"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/40 p-4 backdrop-blur-sm [&>div]:border-0 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none">
          <PieChartStacked />
        </div>

        <Separator />

        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/50 px-4 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Potential monthly savings</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">{savings}</p>
          </div>

          <Button onClick={onExplore} className="rounded-2xl cursor-pointer">
            {cta}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoCard;
