import express from "express";
import {
  createHabit,
  getHabits
} from "../controllers/habitsController.js";

const router = express.Router();

router.post("/", createHabit);
router.get("/", getHabits);

export default router;