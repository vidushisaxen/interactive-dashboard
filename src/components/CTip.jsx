const CTip = ({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter = (value) => value,
}) => {
  if (!active || !payload?.length) return null;

  const displayLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <div className="min-w-40 rounded-lg border  border border-border bg-popover/95 px-3 py-2.5 text-popover-foreground shadow-md backdrop-blur">
      {displayLabel ? (
        <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {displayLabel}
        </div>
      ) : null}

      <div className="space-y-1.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color || "var(--chart-1)" }}
            />
            <span className="text-muted-foreground">
              {item.name ?? "Value"}:
            </span>
            <span className="ml-auto font-semibold text-foreground">
              {valueFormatter(item.value, item)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CTip;
