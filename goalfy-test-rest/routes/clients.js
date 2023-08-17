import express from "express";
import { getClients, getQuantityClients } from "../controller/clients.js";

const router = express.Router();

router.get("/clients", getClients);
router.get("/quantity", getQuantityClients);

export default router;
