import express from "express";
import {
	getClients,
	getQuantityClients,
	postClient,
	editClient,
	deleteClient,
} from "../controller/clients.js";

const router = express.Router();

router.get("/clients", getClients);
router.get("/quantity", getQuantityClients);
router.post("/newclient", postClient);
router.put("/editclient/:id", editClient);
router.delete("/deleteclient/:id", deleteClient);

export default router;
