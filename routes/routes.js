import express from "express";
import whatsAppInfo from "../controllers/controller.js";

const router = express.Router();
router.route("/").get(whatsAppInfo.whatsAppHome);
router.route("/messages/new").post(whatsAppInfo.SendMsg);
router.route("/messages/sync").get(whatsAppInfo.getAllMessages);

export default router;
