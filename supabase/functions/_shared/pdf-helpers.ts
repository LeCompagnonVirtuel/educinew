// =====================================================
// EduCI — PDF generation helpers for email attachments
// =====================================================

const PDF_IMPORT_URL = "https://esm.sh/pdf-lib@1.17.1";

export interface PdfAttachment {
  filename: string;
  content: string; // base64 encoded
  contentType: string;
}

export async function generateBulletinPdf(data: {
  studentName: string;
  className: string;
  periodName: string;
  generalAverage: number;
  totalScore: number;
  totalCoefficient: number;
  mention: string;
  grades: { subject: string; score: number; maxScore: number; coefficient: number; average: number }[];
  schoolName?: string;
  rank?: number;
  classSize?: number;
}): Promise<PdfAttachment> {
  const { PDFDocument, rgb, StandardFonts } = await import(PDF_IMPORT_URL);
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const margin = 50;

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width,
    height: 120,
    color: rgb(0.31, 0.27, 0.9),
  });

  // School name
  page.drawText(data.schoolName || "EduCI", {
    x: margin,
    y: height - 45,
    size: 24,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // Title
  page.drawText("Bulletin Scolaire", {
    x: margin,
    y: height - 75,
    size: 16,
    font: helvetica,
    color: rgb(0.9, 0.9, 1),
  });

  // Period
  page.drawText(data.periodName, {
    x: margin,
    y: height - 100,
    size: 12,
    font: helvetica,
    color: rgb(0.8, 0.8, 1),
  });

  let y = height - 160;

  // Student info
  const infoItems = [
    ["Élève", data.studentName],
    ["Classe", data.className],
    ["Matricule", ""],
    ["Moyenne Générale", `${data.generalAverage}/20`],
    ["Mention", data.mention],
  ];

  if (data.rank) infoItems.push(["Rang", `${data.rank}/${data.classSize || "?"}`]);

  for (const [label, value] of infoItems) {
    page.drawText(`${label}:`, {
      x: margin,
      y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(String(value), {
      x: margin + 150,
      y,
      size: 11,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 20;
  }

  y -= 10;

  // Grades table header
  page.drawRectangle({
    x: margin,
    y: y - 5,
    width: width - margin * 2,
    height: 22,
    color: rgb(0.31, 0.27, 0.9),
  });

  const cols = [margin + 5, margin + 200, margin + 280, margin + 360, margin + 430];
  const headers = ["Matière", "Note", "Coeff.", "Moyenne", "Bonus"];
  headers.forEach((h, i) => {
    page.drawText(h, {
      x: cols[i],
      y: y + 2,
      size: 10,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
  });

  y -= 25;

  // Grades rows
  for (const grade of data.grades) {
    if (y < 80) {
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      y = newPage.getSize().y - 50;
      // @ts-ignore - page reference update
      page.drawText("", { x: 0, y: 0, size: 1 });
    }

    page.drawText(grade.subject, {
      x: cols[0],
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(`${grade.score}/${grade.maxScore}`, {
      x: cols[1],
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(String(grade.coefficient), {
      x: cols[2],
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(`${grade.average}/20`, {
      x: cols[3],
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(`${grade.score * grade.coefficient}`, {
      x: cols[4],
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.2, 0.2, 0.2),
    });

    y -= 18;
  }

  // Summary
  y -= 10;
  page.drawRectangle({
    x: margin,
    y: y - 5,
    width: width - margin * 2,
    height: 25,
    color: rgb(0.95, 0.95, 1),
  });
  page.drawText(`Total: ${data.totalScore} | Coeff: ${data.totalCoefficient} | Moyenne: ${data.generalAverage}/20`, {
    x: margin + 10,
    y,
    size: 11,
    font: helveticaBold,
    color: rgb(0.31, 0.27, 0.9),
  });

  // Footer
  page.drawText("Généré par EduCI — educi.live", {
    x: margin,
    y: 40,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });
  page.drawText(`Le ${new Date().toLocaleDateString("fr-FR")}`, {
    x: width - margin - 100,
    y: 40,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });

  const pdfBytes = await pdfDoc.save();
  const base64 = btoa(String.fromCharCode(...pdfBytes));

  return {
    filename: `bulletin_${data.studentName.replace(/\s+/g, "_")}_${data.periodName.replace(/\s+/g, "_")}.pdf`,
    content: base64,
    contentType: "application/pdf",
  };
}

export async function generateReceiptPdf(data: {
  studentName: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  paymentDate: string;
  schoolName: string;
  invoiceType?: string;
}): Promise<PdfAttachment> {
  const { PDFDocument, rgb, StandardFonts } = await import(PDF_IMPORT_URL);
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const margin = 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width,
    height: 100,
    color: rgb(0.02, 0.59, 0.41),
  });

  page.drawText("REÇU DE PAIEMENT", {
    x: margin,
    y: height - 45,
    size: 22,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(data.schoolName, {
    x: margin,
    y: height - 70,
    size: 14,
    font: helvetica,
    color: rgb(0.9, 1, 0.95),
  });

  let y = height - 140;

  const fields = [
    ["Référence", data.reference],
    ["Date", data.paymentDate],
    ["Élève", data.studentName],
    ["Type", data.invoiceType || "Scolarité"],
    ["Méthode", data.paymentMethod],
  ];

  for (const [label, value] of fields) {
    page.drawText(`${label}:`, {
      x: margin,
      y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(String(value), {
      x: margin + 120,
      y,
      size: 11,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 22;
  }

  y -= 20;

  // Amount box
  page.drawRectangle({
    x: margin,
    y: y - 10,
    width: width - margin * 2,
    height: 60,
    color: rgb(0.02, 0.59, 0.41),
    borderColor: rgb(0.02, 0.59, 0.41),
    borderWidth: 2,
  });

  page.drawText("MONTANT PAYÉ", {
    x: margin + 20,
    y: y + 25,
    size: 12,
    font: helvetica,
    color: rgb(0.9, 1, 0.95),
  });

  page.drawText(`${data.amount.toLocaleString("fr-FR")} XOF`, {
    x: margin + 20,
    y: y,
    size: 24,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  // Footer
  page.drawText("Ce reçu fait foi de votre paiement.", {
    x: margin,
    y: 80,
    size: 10,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("EduCI — educi.live", {
    x: margin,
    y: 60,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });

  const pdfBytes = await pdfDoc.save();
  const base64 = btoa(String.fromCharCode(...pdfBytes));

  return {
    filename: `recu_${data.reference}.pdf`,
    content: base64,
    contentType: "application/pdf",
  };
}

export async function generateInvoicePdf(data: {
  studentName: string;
  amount: number;
  finalAmount: number;
  discountAmount?: number;
  dueDate: string;
  invoiceType: string;
  reference: string;
  schoolName: string;
  paidAmount?: number;
  status: string;
}): Promise<PdfAttachment> {
  const { PDFDocument, rgb, StandardFonts } = await import(PDF_IMPORT_URL);
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const margin = 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width,
    height: 100,
    color: rgb(0.31, 0.27, 0.9),
  });

  page.drawText("FACTURE", {
    x: margin,
    y: height - 45,
    size: 22,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(data.schoolName, {
    x: margin,
    y: height - 70,
    size: 14,
    font: helvetica,
    color: rgb(0.9, 0.9, 1),
  });

  let y = height - 140;

  const fields = [
    ["Facture N°", data.reference],
    ["Date", new Date().toLocaleDateString("fr-FR")],
    ["Élève", data.studentName],
    ["Type", data.invoiceType],
    ["Échéance", data.dueDate],
    ["Statut", data.status === "PAID" ? "Payée" : data.status === "PARTIAL" ? "Partiellement payée" : "Impayée"],
  ];

  for (const [label, value] of fields) {
    page.drawText(`${label}:`, {
      x: margin,
      y,
      size: 11,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(String(value), {
      x: margin + 120,
      y,
      size: 11,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
    y -= 22;
  }

  y -= 20;

  // Amount section
  page.drawRectangle({
    x: margin,
    y: y - 10,
    width: width - margin * 2,
    height: 80,
    color: rgb(0.97, 0.97, 1),
  });

  page.drawText("Montant total:", {
    x: margin + 20,
    y: y + 40,
    size: 12,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3),
  });
  page.drawText(`${data.amount.toLocaleString("fr-FR")} XOF`, {
    x: width - margin - 140,
    y: y + 40,
    size: 12,
    font: helveticaBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  if (data.discountAmount && data.discountAmount > 0) {
    page.drawText("Remise:", {
      x: margin + 20,
      y: y + 15,
      size: 12,
      font: helvetica,
      color: rgb(0.02, 0.59, 0.41),
    });
    page.drawText(`-${data.discountAmount.toLocaleString("fr-FR")} XOF`, {
      x: width - margin - 140,
      y: y + 15,
      size: 12,
      font: helveticaBold,
      color: rgb(0.02, 0.59, 0.41),
    });
  }

  page.drawText("Montant dû:", {
    x: margin + 20,
    y: y - 10,
    size: 14,
    font: helveticaBold,
    color: rgb(0.31, 0.27, 0.9),
  });
  page.drawText(`${data.finalAmount.toLocaleString("fr-FR")} XOF`, {
    x: width - margin - 140,
    y: y - 10,
    size: 16,
    font: helveticaBold,
    color: rgb(0.31, 0.27, 0.9),
  });

  // Footer
  page.drawText("EduCI — educi.live", {
    x: margin,
    y: 60,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6),
  });

  const pdfBytes = await pdfDoc.save();
  const base64 = btoa(String.fromCharCode(...pdfBytes));

  return {
    filename: `facture_${data.reference}.pdf`,
    content: base64,
    contentType: "application/pdf",
  };
}
