// routes/profile.routes.ts
import { Router } from "express";
import { createProfile } from "../controllers/profile.controller";
import { requireKindeUser } from "../middleware/auth";
import { upload } from "../api/multerupload";
import { createAccount } from "../controllers/account.controller";



const routes = Router();

routes.post("/create",   upload.single("file"), createProfile);
routes.post("/account",   createAccount);

export default routes;
