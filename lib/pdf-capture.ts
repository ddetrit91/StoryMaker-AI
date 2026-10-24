import type { Options } from "html2canvas";

/**
 * Снимок в iframe без CSS страницы (Tailwind lab/oklab ломает html2canvas).
 * PdfDocument уже на hex/rgba inline — достаточно клонировать как есть.
 */
export async function captureElementToCanvas(
  source: HTMLElement,
  html2canvas: (
    element: HTMLElement,
    options?: Partial<Options>,
  ) => Promise<HTMLCanvasElement>,
): Promise<HTMLCanvasElement> {
  const width = Math.max(source.scrollWidth, source.offsetWidth, 900);
  const height = Math.max(source.scrollHeight, source.offsetHeight, 600);
  const clone = source.cloneNode(true) as HTMLElement;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("tabindex", "-1");
  Object.assign(iframe.style, {
    position: "fixed",
    left: "-12000px",
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    border: "0",
  });
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    document.body.removeChild(iframe);
    throw new Error("PDF iframe unavailable");
  }

  doc.open();
  doc.write("<!DOCTYPE html><html><head></head><body></body></html>");
  doc.close();

  const fontLink = doc.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Manrope:wght@400;600;700&display=swap";
  doc.head.appendChild(fontLink);

  doc.body.style.margin = "0";
  doc.body.style.background = "#faf7f4";
  doc.body.appendChild(clone);

  await new Promise<void>((resolve) => {
    win.setTimeout(() => resolve(), 180);
  });

  try {
    return await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#faf7f4",
      useCORS: true,
      logging: false,
      width,
      height,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width,
      windowHeight: height,
    });
  } finally {
    document.body.removeChild(iframe);
  }
}
