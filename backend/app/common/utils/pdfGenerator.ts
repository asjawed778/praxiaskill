import PDFDocument from "pdfkit";

/**
 * Generates a PDF file in memory from provided data.
 * @param data - Object containing the data to be added to the PDF.
 * @returns {Promise<Buffer>} - Buffer containing the generated PDF data.
 */
export const generatePDF = async (data: Record<string, any>): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      // Collect PDF data in chunks
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Add content to PDF
      doc.fontSize(16).text("CCFS | Startovation 2025", { align: "center" }).moveDown();

      Object.entries(data).forEach(([key, value]) => {
        doc.fontSize(12).text(`${key}: ${value}`).moveDown(0.5);
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};