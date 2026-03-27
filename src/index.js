import "dotenv/config";
import express from "express";
import cors from "cors";

import expenseRoutes from "./routes/expenses.js";
import userRoutes from "./routes/users.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});