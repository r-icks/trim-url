import express from "express"
const router=express.Router();

import { redirectToUrl } from "../controllers/redirectController.js";

router.route("/:collectionName/:shortName").get(redirectToUrl);

export default router