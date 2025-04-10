import { Request, Response, NextFunction } from "express";

export const requireKindeUser = (req: Request, res: Response, next: NextFunction): void => {
  const { kindeId } = req.body; // ✅ Now reading from the body

  if (!kindeId) {
    res.status(401).json({ error: "Unauthorized. Missing Kinde ID in request body." });
    return;
  }

  next(); // No need to attach it to req anymore if you're using req.body.kindeId directly
};
