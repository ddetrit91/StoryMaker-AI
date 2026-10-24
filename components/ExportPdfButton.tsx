"use client";

import { useState } from "react";
import type { StorySeries, TemplateId } from "@/lib/types";
import { captureElementToCanvas } from "@/lib/pdf-capture";
import { PdfDocument } from "./PdfDocument";

interface ExportPdfButtonProps {
  series: StorySeries;
  templateId: TemplateId;
  nicheLabel: string;
}

export function ExportPdfButton({
  series,
  templateId,
  nicheLabel,
}: ExportPdfButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  async function handleExport() {
    setExportError(null);
    setExporting(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      const node = document.getElementById("pdf-export-root");
      if (!node) {
        throw new Error("PDF container not found");
      }

      const canvas = await captureElementToCanvas(node, html2canvas);

      const imgData = canvas.toDataURL("image/jpeg", 0.94);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;

      while (heightLeft > 0) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }

      const stamp = new Date().toISOString().slice(0, 10);
      pdf.save(`storymaker-${stamp}.pdf`);
    } catch (err) {
      console.error("PDF export failed", err);
      setExportError("Не удалось создать PDF. Попробуйте ещё раз.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3.5 text-sm font-medium text-text transition hover:border-accent hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting ? (
            <>
              <span
                className="h-4 w-4 animate-spin-slow rounded-full border-2 border-muted/30 border-t-text"
                aria-hidden
              />
              PDF…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Скачать PDF
            </>
          )}
        </button>
        {exportError ? (
          <p className="text-xs text-danger" role="alert">
            {exportError}
          </p>
        ) : null}
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[-1]"
        style={{ left: "-10000px", width: 900 }}
      >
        <PdfDocument
          nicheLabel={nicheLabel}
          templateId={templateId}
          stories={[...series.stories]}
        />
      </div>
    </>
  );
}
