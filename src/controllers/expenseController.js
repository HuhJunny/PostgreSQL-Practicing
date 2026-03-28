import prisma from "../lib/prisma.js";

import { success } from "zod";
import {
  createExpenseService,
  getExpensesService,
  updateExpenseService,
  deleteExpenseService,
} from "../services/expenseService.js";


export async function createExpense(req, res, next) {
  try {
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const expense = await createExpenseService(
      {
        ...req.validatedBody,
        imageUrl,
      },
      req.user.userId
    );

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
}

export async function getExpenses(req, res, next) {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateExpense(req, res) {
  try {
    const expense = await updateExpenseService(req.params.id, req.body);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteExpense(req, res) {
  try {
    await deleteExpenseService(req.params.id);
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}