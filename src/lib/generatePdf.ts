import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePdf(containerIds: string[], filename: string = "price-tags.pdf") {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  for (let i = 0; i < containerIds.length; i++) {
    const el = document.getElementById(containerIds[i]);
    if (!el) continue;

    if (i > 0) doc.addPage();

    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    // A4 landscape: 297 x 210
    doc.addImage(imgData, "PNG", 0, 0, 297, 210);
  }

  const finalFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  doc.save(finalFilename);
}
