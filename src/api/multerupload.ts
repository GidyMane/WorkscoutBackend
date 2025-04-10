import express, { RequestHandler } from "express"
import multer from "multer"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()
export const upload = multer()

const handleUpload: RequestHandler = async (req, res) => {
  const file = req.file

  if (!file) {
    res.status(400).json({ error: "No file uploaded" })
    return
  }

  try {
    const savedDocument = await prisma.document.create({
      data: {
        name: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      },
    })

    res.status(201).json({
      message: "File uploaded successfully",
      documentId: savedDocument.id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: "Failed to upload file" })
  }
}

router.post("/upload", upload.single("file"), handleUpload)

export default router
