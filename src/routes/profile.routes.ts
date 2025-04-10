// routes/profile.routes.ts
import { Router } from "express";
import { createProfile } from "../controllers/profile.controller";
import { requireKindeUser } from "../middleware/auth";


const routes = Router();

routes.post("/create", requireKindeUser, createProfile);

export default routes;
