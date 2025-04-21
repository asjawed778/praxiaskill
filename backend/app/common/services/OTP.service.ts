import { IOTP } from "../dto/otp.dto";
import { loadConfig } from "../helper/config.hepler";
import { generateOTP } from "../helper/OTP.helper";
import { emailQueue } from "../queue/queues/email.queue";
import OTPSchema from "../schema/OTPSchema"
import otpTemplate from "../template/OTP.template";
loadConfig();

export const sendOTP = async (email: string, subject: string = "Your OTP code") => {
    const otp = generateOTP();
    const otpData: IOTP = {
        email,
        otp
    };
    await OTPSchema.deleteMany({ email });
    await OTPSchema.create(otpData);
    const emailContent = otpTemplate(otp);
    await emailQueue.add('sendEmail', {
        from: process.env.MAIL_USER,
        to: email,
        subject: "OTP Verification",
        html: emailContent,
    });

    return { message: "OTP has been sent successfully." };
}

export const verifyOTP = async (email: string, otp: string) => {
    const otpData = await OTPSchema.findOne({ email, otp });
    if (otpData) {
        await OTPSchema.deleteMany({ email });
        return true;
    }
    return false;
}