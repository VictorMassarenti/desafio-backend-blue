import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../config/jwt";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }

    const decoded = verifyAccessToken(token);

    if (decoded) {
      if (typeof decoded === "string") {
        req.user = decoded;
      } else {
        req.user = (decoded as JwtPayload).id;
      }
    } else {
      res.status(401);
      res.json({ message: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    console.log(JSON.stringify(error));
    return res.status(500).json({ error: "Internal server error" });
  }
}
