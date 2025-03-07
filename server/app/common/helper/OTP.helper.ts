import otpGenerator from 'otp-generator';

export const generateOTP = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    return otp;
}