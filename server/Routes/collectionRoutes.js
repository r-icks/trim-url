
import express from "express"
import { addCollection, addUrl, getCollectionsAndUrls, getUrlLogs } from "../controllers/collectionController.js";
const router=express.Router();

router.route("/url/:urlId").get(getUrlLogs);
router.route("/url").post(addUrl).get(getUrlLogs);
router.route("/collection").post(addCollection).get(getCollectionsAndUrls);

export default router