import express from "express";
import { ClientController } from "../controller/client.controller.js";

const router = express.Router();

router.get("/clients", ClientController.handleGetClients);
router.get("/quantity", ClientController.getQuantityClients);
router.post("/newclient", ClientController.handleInsertClient);
router.put("/editclient/:id", ClientController.editClient);
router.delete("/deleteclient/:id", ClientController.deleteClient);

export default router;
