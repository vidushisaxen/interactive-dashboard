"use client";

import { Download } from "@/components/icons";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { exportRowsAsCsv } from "@/lib/export-csv";

const ExportCsvButton = ({ fileName, rows, className = "", label = "Export CSV" }) => {
  const iconRef = useRef(null);
  const [open, setOpen] = useState(false);

  const rowCount = Array.isArray(rows) ? rows.length : 0;
  const disabled = rowCount === 0;
  const safeFileName = typeof fileName === "string" && fileName.trim() ? fileName.trim() : "export";

  const description = useMemo(() => {
    const suffix = rowCount === 1 ? "row" : "rows";
    return `Download a CSV file named “${safeFileName}” containing ${rowCount} ${suffix}.`;
  }, [rowCount, safeFileName]);

  const confirmDownload = () => {
    // Keep this synchronous to preserve the user-gesture for browser downloads.
    exportRowsAsCsv(safeFileName, rows);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        onMouseEnter={() => iconRef.current?.startAnimation?.()}
        onMouseLeave={() => iconRef.current?.stopAnimation?.()}
        className={className}
        disabled={disabled}
      >
        <Download ref={iconRef} className="mr-2 h-4 w-4" />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[26rem]">
          <DialogHeader className="mt-3 space-y-5">
            <DialogTitle>Download CSV?</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="cursor-pointer rounded-lg">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={confirmDownload} className="cursor-pointer rounded-lg">
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportCsvButton;
