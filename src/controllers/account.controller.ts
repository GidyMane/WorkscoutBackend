import { Request, Response } from "express";
import prisma from "../client";

export async function createAccount(req: Request, res: Response): Promise<void> {
  console.log(req.body, "body");
  const { kindeId, email } = req.body;

  try {
    const existing = await prisma.account.findUnique({ where: { kindeId } });
    if (existing) {
      res.status(200).json(existing);
      return;
    }

    const account = await prisma.account.create({
      data: {
        kindeId,
        email        
      },
    });

    res.status(201).json(account);
  } catch (error) {
    console.error("Create account error:", error);
    res.status(500).json({ error: "Failed to create account" });
  }
}


