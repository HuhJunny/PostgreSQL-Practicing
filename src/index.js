import express from "express";
import habitRoutes from "./routes/habits.js";

const app = express();

app.use(express.json());

app.use("/habits", habitRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "server works" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});