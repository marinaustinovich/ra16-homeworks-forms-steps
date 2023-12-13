import { nanoid } from "nanoid";
import { WorkoutItemType } from "./../components/WorkoutItem/WorkoutItem";

type DistanceData = {
  data: WorkoutItemType[];
  date: string;
  distance: string;
  id?: string;
  selectedWorkout: WorkoutItemType | null;
};

export const updateDistance = ({
    data,
    date,
    distance,
    id,
    selectedWorkout,
  }: DistanceData): WorkoutItemType[] => {
    if (selectedWorkout) {
      return data.map((entry) => 
        entry.id === id 
          ? { ...selectedWorkout, date, result: distance } 
          : entry
      );
    } else {
      const existingEntryIndex = data.findIndex((entry) => entry.date === date);
      
      if (existingEntryIndex !== -1) {
        return data.map((entry, index) => {
          if (index === existingEntryIndex) {
            const updatedDistance = parseFloat(entry.result) + parseFloat(distance);
            return { ...entry, result: updatedDistance.toFixed(1) };
          }
          return entry;
        });
      } else {
        const newEntry = { date, result: distance, id: nanoid() };
        return [...data, newEntry];
      }
    }
  };
  