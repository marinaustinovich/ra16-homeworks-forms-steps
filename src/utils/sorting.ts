import { WorkoutItemType } from "../components";

export const sortWorkoutsByDate = (workouts: WorkoutItemType[]) => {
  return workouts.sort((a, b) => {
    const dateA = new Date(a.date.split(".").reverse().join("-"));
    const dateB = new Date(b.date.split(".").reverse().join("-"));

    return dateB.getTime() - dateA.getTime();
  });
};
