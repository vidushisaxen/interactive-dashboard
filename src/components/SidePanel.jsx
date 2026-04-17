import { X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const widthClassMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

const SidePanel = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "md",
}) => {
  const panelWidth = widthClassMap[width] || widthClassMap.md;
  const closeIconRef = useRef(null);

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose?.()}>
      <SheetContent
        side="right"
        className={`flex h-screen w-full flex-col border-l  border border-border bg-background p-0 shadow-2xl [&>button]:hidden ${panelWidth}`}
      >
        <div className="flex items-start justify-between border-b  border border-border px-6 py-6">
          <SheetHeader className="space-y-1 text-left">
            <SheetTitle className="text-lg font-semibold tracking-tight">
              {title}
            </SheetTitle>

            {subtitle ? (
              <SheetDescription className="text-sm text-muted-foreground">
                {subtitle}
              </SheetDescription>
            ) : null}
          </SheetHeader>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClose}
            onMouseEnter={() => closeIconRef.current?.startAnimation?.()}
            onMouseLeave={() => closeIconRef.current?.stopAnimation?.()}
            className="h-10 w-10 rounded-lg cursor-pointer"
          >
            <X ref={closeIconRef} className="h-4 w-4" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;
