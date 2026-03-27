import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

import { validate } from "../middlewares/validate.js";
import { createExpenseSchema } from "../dtos/expense.dto.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createExpenseSchema),
  createExpense
);
router.get("/", authMiddleware, getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;