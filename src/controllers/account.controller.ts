import { Request, Response } from "express"
import prisma from "../client"

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  const { kindeId, email } = req.body

  try {
    const existing = await prisma.account.findUnique({ where: { kindeId } })
    if (existing) {
      res.status(200).json(existing)
      return
    }

    const account = await prisma.account.create({
      data: {
        kindeId,
        email,
        isOnboarded: false,
        onboardingstep: "ONE",
      },
    })

    res.status(201).json(account)
  } catch (error) {
    console.error("Create account error:", error)
    res.status(500).json({ error: "Failed to create account" })
  }
}
