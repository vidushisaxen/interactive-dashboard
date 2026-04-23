import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChartCard({ title, description, children, className, action }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {action}
        </div>
      </CardHeader>

      <CardContent className="pt-1">
        <div className="rounded-lg bg-background/40 p-1">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
