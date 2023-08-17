import express from "express";
import clientsRoute from "./routes/clients.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Define routes
app.use("/", clientsRoute)

app.listen(8000, () => console.log("Server is running on port 8000"));
