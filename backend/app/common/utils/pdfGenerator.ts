import PDFDocument from "pdfkit";

/**
 * Generates a PDF file in memory with numbering and bold field keys.
 * @param data - Object containing the data to be added to the PDF.
 * @returns {Promise<Buffer>} - Buffer containing the generated PDF data.
 */
export const generatePDF = async (data: Record<string, any>): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      let fieldCount = 1; // Counter for numbering fields

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // **Header Styling**
      doc
        .fillColor("#007ACC") // Blue header color
        .fontSize(20)
        .text("CCFS | Startovation 2025", { align: "center" })
        .moveDown(1);

      // **Function to handle objects**
      const processEntry = (key: string, value: any, indentLevel = 0) => {
        const indent = " ".repeat(indentLevel * 4);

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          // **Section Headers with Background**
          doc
            .fillColor("#ffffff")
            .rect(50, doc.y, 500, 20)
            .fill("#007ACC");
          doc
            .fillColor("#ffffff")
            .fontSize(14)
            .text(`${fieldCount}. ${key.toUpperCase()}`, 55, doc.y - 15);
          doc.moveDown(0.5);
          fieldCount++;

          Object.entries(value).forEach(([subKey, subValue]) => {
            doc
              .fontSize(12)
              .fillColor("black")
              .text(`${indent}   - ${subKey}: ${subValue}`, { continued: false })
              .moveDown(0.3);
          });
          doc.moveDown(1);
        } else if (Array.isArray(value)) {
          // **Handle Arrays**
          doc
            .fontSize(14)
            .fillColor("#007ACC")
            .text(`${fieldCount}. ${key.toUpperCase()}`, { underline: true })
            .moveDown(0.5);
          fieldCount++;

          value.forEach((item, index) => {
            doc
              .fontSize(12)
              .fillColor("black")
              .text(`${indent}   - Member ${index + 1}:`)
              .moveDown(0.2);
            if (typeof item === "object" && item !== null) {
              Object.entries(item).forEach(([subKey, subValue]) => {
                doc
                  .fontSize(11)
                  .fillColor("#666666")
                  .text(`${indent}     • ${subKey}: ${subValue}`)
                  .moveDown(0.2);
              });
            } else {
              doc.fontSize(11).text(`${indent}     • ${item}`).moveDown(0.2);
            }
          });
          doc.moveDown(1);
        } else {
          // **Regular Fields**
          doc
            .fontSize(12)
            .fillColor("black")
            .font("Helvetica-Bold") // **Bold for Keys**
            .text(`${fieldCount}. ${key}:`, { continued: true })
            .fillColor("#000000")
            .font("Helvetica") // **Normal for Values**
            .text(` ${value}`)
            .moveDown(0.5);
          fieldCount++;
        }
      };

      // **Process Each Key-Value Pair**
      Object.entries(data).forEach(([key, value]) => processEntry(key, value));

      // **Footer**
      doc
        .moveDown(2)
        .fillColor("#007ACC")
        .fontSize(10)
        .text(`Generated on: ${new Date().toLocaleString()}`, { align: "right" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};