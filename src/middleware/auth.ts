// middlewares/auth.ts
import { Request, Response, NextFunction } from "express";

export const requireKindeUser = (req: Request, res: Response, next: NextFunction): void => {
  const kindeId = req.headers["kinde-id"] as string; // you can change this based on your actual Kinde header or decoded token

  if (!kindeId) {
    res.status(401).json({ error: "Unauthorized. Missing Kinde ID." });
    return; // End the middleware chain without returning a value
  }

  req.kindeId = kindeId;
  next(); // Pass control to the next middleware
};
