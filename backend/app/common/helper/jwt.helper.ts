import jwt from "jsonwebtoken";
import { loadConfig } from "./config.hepler";
import createHttpError from "http-errors";
import { Payload } from "../../user/user.dto";
loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY: string = process.env.ACCESS_TOKEN_EXPIRY as string;
const REFRESH_TOKEN_EXPIRY: string = process.env.REFRESH_TOKEN_EXPIRY as string;

/**
 * Generates access and refresh tokens for the given payload.
 * 
 * @param {Payload} payload - The payload to be included in the JWT.
 * @returns {Object} - An object containing the generated access and refresh tokens.
 * @throws {Error} - Throws an error if token generation fails.
 */
export const generateTokens = (payload: Payload) => {
  try {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw createHttpError(500, "Error generating tokens");
  }
};


export const validateToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};


/**
 * Decodes and verifies the access token, attaching the user information.
 * 
 * @param {string} encryptedAccessToken - The encrypted access token to decode and verify.
 * @returns {Payload} - The decoded payload containing user information.
 * @throws {HttpError} - Throws an HTTP error if the token is invalid or expired.
 */
export const decodeAccessToken = async (encryptedAccessToken: string) => {
  // Verify token and attach the user information to the request object
  const payload: Payload = jwt.verify(
    encryptedAccessToken,
    ACCESS_TOKEN_SECRET
  ) as Payload;
  if (payload === null) {
    throw createHttpError(403, {
      message: "Invalid Token...",
    });
  }
  return payload;
};


/**
 * Generates a password reset token for the given user ID.
 * 
 * @param {string} userId - The ID of the user requesting the password reset.
 * @returns {string} - The generated password reset token.
 * @throws {Error} - Throws an error if token generation fails.
 */
export const generatePasswordRestToken = async (userId: string) => {
  const resetToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return resetToken;
};


/**
 * Verifies the password reset token.
 * 
 * @param {string} token - The password reset token to be verified.
 * @returns {Object} - An object with properties `valid` (boolean) and `decoded` (the decoded payload) or `error`.
 */
export const verifyResetPasswordToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};
