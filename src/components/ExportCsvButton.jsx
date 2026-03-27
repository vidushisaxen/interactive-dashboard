"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { exportRowsAsCsv } from "@/lib/export-csv";

const ExportCsvButton = ({ fileName, rows, className = "", label = "Export CSV" }) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => exportRowsAsCsv(fileName, rows)}
      className={className}
      disabled={!rows?.length}
    >
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default ExportCsvButton;
