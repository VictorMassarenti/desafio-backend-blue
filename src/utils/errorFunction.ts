import { Response } from "express";

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  errMessage: string
) {
  res.status(statusCode).json({
    status: "error",
    error: [{ message: errMessage }],
  });
}
