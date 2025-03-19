import { generatePDF } from "../common/utils/pdfGenerator";


export const ccfsEvent = async (data: Record<string, any>) => {
    console.log("Event created successfully");
    const pdfBuffer = await generatePDF(data);
    return pdfBuffer;
};