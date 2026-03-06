import "dotenv/config";
import express from "express";
import warehouseRoutes from "./routes/warehouseRoute.js";
import inventoryRoutes from "./routes/inventoryRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Welcome to my API");
});

app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
