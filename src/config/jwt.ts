import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function signAcessToken(
  payload: JwtPayload,
  options = {
    expiresIn: "12h",
  }
) {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) throw new Error("JWT_SECRET not found");

  const token = jwt.sign(payload, secretKey, options);

  return { token };
}

export function verifyAccessToken(token: string) {
  try {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) throw new Error("JWT_SECRET not found");

    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
}
