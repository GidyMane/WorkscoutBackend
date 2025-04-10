// controllers/profile.controller.ts
import { Request, Response } from "express";
import prisma from "../client";

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  const { name, bio, documents, kindeId } = req.body;

  try {
    const account = await prisma.account.findUnique({
      where: { kindeId },
    });

    if (!account) {
      res.status(404).json({ error: "Account not found." });
      return; // End the function early here, no need to return a response
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        documents,
        account: {
          connect: { id: account.id },
        },
      },
    });

    res.status(201).json(profile); // Directly handle response, no return necessary
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
