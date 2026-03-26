import { ArrowUpRight } from "lucide-react";
import RadialChartLabel from "./RadialChartLabel";

const SavingsCard = ({
  title = "Goal Savings",
  amount = "$8,420.00",
  growth = "+11.2%",
  note = "Your savings goals are on track this month",
  onViewGoals,
}) => {
  return (
    <section className="rounded-[28px] border border-border/60 bg-card p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_64px_rgba(0,0,0,0.36)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-[15px] font-semibold text-foreground">
            {title}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{note}</div>
        </div>

        <button
          onClick={onViewGoals}
          className="inline-flex items-center cursor-pointer gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary transition hover:bg-primary/15"
        >
          {growth}
          <ArrowUpRight size={12} />
        </button>
      </div>

      <div className="mb-4 rounded-[22px] border border-border/60 bg-background px-4 py-3">
        <div className="text-xs text-muted-foreground">Total saved</div>
        <div className="mt-1 text-[28px] font-semibold tracking-tight text-foreground">
          {amount}
        </div>
      </div>

      <div className="[&>div]:border-0 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none">
        <RadialChartLabel/>
      </div>
    </section>
  );
};

export default SavingsCard;
