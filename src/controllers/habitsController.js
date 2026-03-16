import { createHabitService, getHabitsService } from "../services/habitsService.js";

export async function createHabit(req, res) {
  try {
    const habit = await createHabitService(req.body);

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getHabits(req, res) {
  console.log("GET /habits called");
    res.json({ message: "habit api works" });
//   try {
//     const habits = await getHabitsService();

//     res.json(habits);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
}