import React, { useCallback, useState } from "react";

import WorkoutList from "../WorkoutsList/WorkoutList";
import { WorkoutItemType } from "../WorkoutItem";
import { FormFiled, FormFiledValues } from "../FormField";
import { updateDistance } from "../../utils";

export const WorkoutCounter = () => {
  const [workoutList, setWorkoutList] = useState<WorkoutItemType[]>([]);

  const [selectedWorkout, setSelectedWorkout] =
    useState<WorkoutItemType | null>(null);

  const onDeleteWorkout = (id: string) => {
    setWorkoutList((prevWorkoutList) =>
      prevWorkoutList.filter((workout) => workout.id !== id)
    );
  };

  const onChangeWorkout = (id: string) => {
    const workout = workoutList.find((item) => item.id === id);
    if (workout) {
      setSelectedWorkout(workout);
    }
  };

  const updateWorkoutList = useCallback(
    (values: FormFiledValues) => {
      setWorkoutList(
        updateDistance({
          data: [...workoutList],
          date: values.date,
          distance: values.result,
          id: selectedWorkout?.id,
          selectedWorkout,
        })
      );
      setSelectedWorkout(null);
    },
    [selectedWorkout, workoutList]
  );

  return (
    <>
      <FormFiled onFormSubmit={updateWorkoutList} selectedWorkout={selectedWorkout}/>

      <WorkoutList
        workoutList={workoutList}
        onDeleteWorkout={onDeleteWorkout}
        onChangeWorkout={onChangeWorkout}
      />
    </>
  );
};
