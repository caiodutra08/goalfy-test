import express from "express";
import { getClients, getQuantityClients } from "../controller/clients.js";

const router = express.Router();

// Choose the route
router.get("/users", getClients);
router.get("/quantity", getQuantityClients);

export default router;
