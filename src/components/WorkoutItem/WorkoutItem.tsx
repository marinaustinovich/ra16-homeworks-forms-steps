import React from "react";
import "./WorkoutItem.css";

export type WorkoutItemType = {
  date: string;
  id: string;
  result: string;
};

type Props = {
  workout: WorkoutItemType;
  onDeleteWorkout: (value: string) => void;
  onChangeWorkout: (value: string) => void;
};

const WorkoutItem = ({ workout, onDeleteWorkout, onChangeWorkout }: Props) => (
  <tr className="WorkoutItem-Work" key={workout.id}>
    <td>{workout.date}</td>
    <td>{workout.result}</td>
    <td>
      <span onClick={() => onChangeWorkout(workout.id)}>✎</span>
      <span onClick={() => onDeleteWorkout(workout.id)}>✘</span>
    </td>
  </tr>
);
export default WorkoutItem;
