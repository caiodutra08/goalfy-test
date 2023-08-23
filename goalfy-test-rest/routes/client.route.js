import express from "express";
import { ClientController } from "../controller/client.controller.js";

const router = express.Router();

router.get("/clients", ClientController.handleGetClients);
router.get("/quantity", ClientController.handleGetQuantityClients);
router.post("/newclient", ClientController.handleInsertClient);
router.put("/editclient/:id", ClientController.handleEditClient);
router.delete("/deleteclient/:id", ClientController.handleDeleteClient);

export default router;
