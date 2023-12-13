import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./FormFiled.css";
import { WorkoutItemType } from "../WorkoutItem";

export type FormFiledValues = {
  date: string;
  result: string;
};

type Props = {
    onFormSubmit: (values: FormFiledValues) => void;
    selectedWorkout?: WorkoutItemType | null;
};

export const FormFiled = ({ onFormSubmit, selectedWorkout }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");


  useEffect(() => {
    if (selectedWorkout && formRef.current) {
        formRef.current["date"].value = selectedWorkout.date || '';
        formRef.current["result"].value = selectedWorkout.result || '';
      }
  }, [selectedWorkout]);


  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const form = formRef.current;
      const date = form["date"].value;
      const result = form["result"].value;

      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      const resultRegex = /^\d+(\.\d{1,2})?$/;

      if (date && result && dateRegex.test(date) && resultRegex.test(result)) {
        onFormSubmit({date, result});
        form.reset();
        setError("");
      } else {
        setError("Неправильный формат вводимых данных");
      }
    }
  };

  return (
    <form className="StepsForm" ref={formRef} onSubmit={handleOnSubmit}>
      <section className="StepsForm-Section">
        <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
        <input
          id="date"
          name="date"
          className="StepsForm-Input"
          placeholder="Формат даты ДД.ММ.ГГГГ"
        />
      </section>
      <section className="StepsForm-Section">
        <label htmlFor="result">Пройдено км</label>
        <input
          id="result"
          name="result"
          className="StepsForm-Input"
          placeholder="Формат ввода в км 0.00"
        />
      </section>
      <button className="StepsForm-Button">ОК</button>
      {error && <p className="Error">{error}</p>}
    </form>
  );
};
