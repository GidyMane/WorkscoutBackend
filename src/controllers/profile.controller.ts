import { Request, Response } from "express";
import prisma from "../client";

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  
  const { name, bio, document, kindeId } = req.body;




  const file = req.file

  if (!file) {
    res.status(400).json({ error: "No file uploaded" })
    return
  }

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Create the Document first
      const newDocument = await prisma.document.create({
        data: {
          name: file.originalname,
          contentType: file.mimetype,
          data: file.buffer,
        },
      })
  
      // 2. Find the account by kindeId
      const account = await prisma.account.findUnique({
        where: { kindeId },
      });

      if (!account) {
        throw new Error("Account not found.");
      }

      // 3. Create the Profile and link it to the created Document and Account
      const profile = await prisma.profile.create({
        data: {
          name,
          bio,
          email: account.email, // Assuming the Profile should use the Account's email
          gender: "", // You can add other fields based on your request body
          location: "",
          salary: "",
          jobtitle: "",
          documentId: newDocument.id, // Link the newly created Document by its ID
          accountId: account.id, // Link the Account by its ID
        },
      });

      return { profile, newDocument };
    });

    // Return the created profile
    res.status(201).json(result.profile);
  } catch (error: unknown) {  // Explicitly typing the error as 'unknown'
    if (error instanceof Error) {
      console.error(error.message);  // Accessing the error message if it is an instance of Error
      res.status(500).json({ error: error.message || "Something went wrong." });
    } else {
      console.error("Unexpected error:", error); // Handle unexpected errors
      res.status(500).json({ error: "Something went wrong." });
    }
  }
};
