import express from "express";
import * as inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

router.route("/").get(inventoryController.index);

export default router;
