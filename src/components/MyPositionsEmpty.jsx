import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MyPositionsEmpty = ({ onNav, onDeposit }) => {
  return (
    <section className="space-y-7">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">My Positions</h2>
        <p className="text-sm text-muted-foreground">
          Track and manage your active liquidity positions.
        </p>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="flex min-h-110 flex-col items-center justify-center px-6 py-16 text-center lg:px-7">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-4xl">
            📂
          </div>

          <Badge variant="secondary" className="mb-3 rounded-full">
            No Active Positions
          </Badge>

          <h3 className="mb-2 text-xl font-semibold tracking-tight">
            You have no position in this pool
          </h3>

          <p className="mb-6 max-w-md text-sm text-muted-foreground">
            Deposit some tokens to open a position and start earning from pool activity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={onDeposit} className="rounded-2xl cursor-pointer">
              Deposit now
            </Button>

            <Button
              variant="outline"
              onClick={() => onNav?.("pools")}
              className="rounded-2xl cursor-pointer"
            >
              Explore pools
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MyPositionsEmpty;
