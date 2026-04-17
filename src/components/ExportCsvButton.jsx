"use client";

import { Download } from "@/components/icons";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { exportRowsAsCsv } from "@/lib/export-csv";

const ExportCsvButton = ({ fileName, rows, className = "", label = "Export CSV" }) => {
  const iconRef = useRef(null);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => exportRowsAsCsv(fileName, rows)}
      onMouseEnter={() => iconRef.current?.startAnimation?.()}
      onMouseLeave={() => iconRef.current?.stopAnimation?.()}
      className={className}
      disabled={!rows?.length}
    >
      <Download ref={iconRef} className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default ExportCsvButton;
