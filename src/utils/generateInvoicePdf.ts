/**
 * Generates a PDF invoice using jsPDF
 */
export interface InvoiceData {
  orderId: string;
  date: string;
  name: string;
  email: string;
  domain: string;
  subtotal: number;
  gst: number;
  total: number;
  paymentMethod: string;
}

export async function generateInvoicePdf(data: InvoiceData) {
  const { default: jsPDF } = await import("jspdf");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = margin;

  // Colors
  const primary = [30, 64, 175]; // blue-800
  const dark = [15, 23, 42]; // slate-900
  const muted = [100, 116, 139]; // slate-500
  const line = [226, 232, 240]; // slate-200

  // --- Header ---
  doc.setFillColor(primary[0], primary[1], primary[2]);
  doc.rect(0, 0, pageW, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", margin, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Infinitive Cloud Private Limited", margin, 28);
  doc.text("www.infinitivecloud.com", margin, 34);

  // Invoice number on right
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice #: ${data.orderId}`, pageW - margin, 18, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${data.date}`, pageW - margin, 26, { align: "right" });
  doc.text(`Status: Paid`, pageW - margin, 34, { align: "right" });

  y = 52;

  // --- Bill To ---
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFontSize(9);
  doc.text("BILL TO", margin, y);
  y += 6;

  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.name, margin, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (data.email) {
    doc.text(data.email, margin, y);
    y += 5;
  }

  // Payment method on right side
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFontSize(9);
  doc.text("PAYMENT METHOD", pageW - margin - 50, 52);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.setFontSize(10);
  doc.text(data.paymentMethod, pageW - margin - 50, 58);

  y += 8;

  // --- Table Header ---
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y, contentW, 10, 2, 2, "F");

  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("ITEM", margin + 4, y + 7);
  doc.text("PERIOD", margin + 90, y + 7);
  doc.text("AMOUNT", pageW - margin - 4, y + 7, { align: "right" });
  y += 14;

  // --- Item Row ---
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Domain: ${data.domain}`, margin + 4, y + 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("Domain Registration", margin + 4, y + 10);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.setFontSize(10);
  doc.text("1 Year", margin + 90, y + 4);
  doc.text(`₹${data.subtotal.toLocaleString("en-IN")}`, pageW - margin - 4, y + 4, { align: "right" });
  y += 16;

  // Separator
  doc.setDrawColor(line[0], line[1], line[2]);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // --- Totals ---
  const totalsX = pageW - margin - 70;

  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFontSize(10);
  doc.text("Subtotal", totalsX, y);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(`₹${data.subtotal.toLocaleString("en-IN")}`, pageW - margin - 4, y, { align: "right" });
  y += 7;

  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text("GST @ 18%", totalsX, y);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(`₹${data.gst.toLocaleString("en-IN")}`, pageW - margin - 4, y, { align: "right" });
  y += 7;

  doc.setDrawColor(line[0], line[1], line[2]);
  doc.line(totalsX, y, pageW - margin, y);
  y += 7;

  doc.setFillColor(primary[0], primary[1], primary[2]);
  doc.roundedRect(totalsX - 4, y - 5, contentW - totalsX + margin + 4, 12, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Total Paid", totalsX, y + 3);
  doc.text(`₹${data.total.toLocaleString("en-IN")}`, pageW - margin - 4, y + 3, { align: "right" });
  y += 20;

  // --- Footer ---
  const footerY = 270;
  doc.setDrawColor(line[0], line[1], line[2]);
  doc.line(margin, footerY, pageW - margin, footerY);

  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Infinitive Cloud Private Limited | GSTIN: 07AAQCI1234A1ZX", margin, footerY + 6);
  doc.text("support@infinitivecloud.com | +91-8800-123-456", margin, footerY + 11);
  doc.text("This is a computer-generated invoice. No signature required.", pageW - margin, footerY + 6, { align: "right" });

  // Save
  doc.save(`Invoice-${data.orderId}.pdf`);
}
