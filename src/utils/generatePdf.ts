import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

interface generatePdfProps {
  fileName: string;
  date: String;
  userId: string;
  status: boolean;
}

export function generatePdf({
  fileName,
  date,
  userId,
  status,
}: generatePdfProps) {
  const doc = new PDFDocument();
  const outputPath = path.join(__dirname, "../../pdf", fileName);

  const dirPath = path.dirname(outputPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(outputPath));
  doc.fontSize(25).text(`Appointment Details`, 100, 100);
  doc.fontSize(18).text(`Date: ${date}`, 100, 150);
  doc.fontSize(18).text(`User ID: ${userId}`, 100, 180);
  doc
    .fontSize(18)
    .text(status ? "Status: Ativo" : "Status: Cancelado", 100, 210);
  doc.end();
}
