import React, { useMemo } from "react";
import "./WorkoutList.css";
import WorkoutItem, { WorkoutItemType } from "../WorkoutItem/WorkoutItem";
import { sortWorkoutsByDate } from "../../utils";

type Props = {
  workoutList: WorkoutItemType[];
  onDeleteWorkout: (value: string) => void;
  onChangeWorkout: (value: string) => void;
};

const WorkoutList = ({
  workoutList,
  onDeleteWorkout,
  onChangeWorkout,
}: Props) => {
  const sortedWorkoutList = useMemo(
    () => sortWorkoutsByDate([...workoutList]),
    [workoutList]
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="WorkoutList-Table_Thead">Дата (ДД.ММ.ГГ.)</th>
            <th className="WorkoutList-Table_Thead">Пройдено км</th>
            <th className="WorkoutList-Table_Thead">Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedWorkoutList.map((workout) => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              onDeleteWorkout={onDeleteWorkout}
              onChangeWorkout={onChangeWorkout}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WorkoutList;
