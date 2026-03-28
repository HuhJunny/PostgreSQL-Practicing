import prisma from "../lib/prisma.js";

export async function createExpenseService(data, userId) {
  return await prisma.expense.create({
    data: {
      amount: data.amount,
      memo: data.memo,
      imageUrl: data.imageUrl,
      userId,
    },
  });
}

export async function getExpensesService(userId) {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateExpenseService(id, data) {
  return await prisma.expense.update({
    where: { id },
    data: {
      amount: data.amount,
      memo: data.memo,
      imageUrl: data.imageUrl,
    },
  });
}

export async function deleteExpenseService(id) {
  return await prisma.expense.delete({
    where: { id },
  });
}