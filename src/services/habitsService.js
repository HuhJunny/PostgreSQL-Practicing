import prisma from "../prisma/client.js";

export async function createHabitService(data) {
  return prisma.habit.create({
    data: {
      name: data.name
    }
  });
}

export async function getHabitsService() {
  return prisma.habit.findMany();
}