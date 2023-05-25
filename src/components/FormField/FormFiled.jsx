import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './FormFiled.css';
import WorkoutList from '../WorkoutsList/WorkoutList';
// import PropTypes from 'prop-types';

function FormFiled(props) {
    const [workoutList, setWorkoutList] = useState([]);
    const [form, setForm] = useState({
        id: '',
        result: '',
        date: '',
    });
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [error, setError] = useState('');

    const onDeleteWorkout = (id) => {
        setWorkoutList((prevWorkoutList) => prevWorkoutList.filter((workout) => workout.id !== id));
    }

    const onChangeWorkout = (id) => {
        const workout = workoutList.find((item) => item.id === id);
        if (workout) {
            setSelectedWorkout(workout);
            setForm({
                date: workout.date,
                result: workout.result,
                id: workout.id,
            });
        }
    };
        

    const onSubmit = (e) => {
        e.preventDefault();
        const { date, result, id } = form;
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        const resultRegex = /^\d+(\.\d{1})?$/;

        if (date && result && dateRegex.test(date) && resultRegex.test(result)) {
                setWorkoutList((prevWorkoutList) => {
                const updatedWorkoutList = [...prevWorkoutList];
                updateDistance(updatedWorkoutList, date, result, id);
                return updatedWorkoutList;
                });
    
            // Сброс формы после сохранения данных
            setForm({
                id: '',
                result: '',
                date: '',
            });
            setError('');
        } else {
            setError('Неправильный формат вводимых данных');
        }
    }

    const onFieldChange = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
        setError('');
    };

    const updateDistance = (data, date, distance, id) => {
        if (selectedWorkout) {
            const changingEntryIndex = data.findIndex((entry) => entry.id === id);

            if (changingEntryIndex !== -1) {
                const updatedEntry = { ...selectedWorkout, date, result: distance };
                data.splice(changingEntryIndex, 1, updatedEntry);
            }
        } else {
            const existingEntryIndex = data.findIndex((entry) => entry.date === date);

            if (existingEntryIndex !== -1) {
                const existingEntry = data[existingEntryIndex];
                const updatedDistance = parseFloat(existingEntry.result) + parseFloat(distance);
                const updatedEntry = { ...existingEntry, result: updatedDistance.toFixed(1) };
                data.splice(existingEntryIndex, 1, updatedEntry);
            } else {
                const newEntry = { date, result: distance, id: nanoid() };
                data.push(newEntry);
            }
        }
    };


    return (
        <>
            <form className="StepsForm" onSubmit={onSubmit}>
                <section className="StepsForm-Section">
                    <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                    <input
                        id="date"
                        name="date"
                        className="StepsForm-Input"
                        onChange={onFieldChange}
                        value={form.date}
                        placeholder="Формат даты ДД.ММ.ГГГГ"
                    />
                </section>
                <section className="StepsForm-Section">
                    <label htmlFor="result">Пройдено км</label>
                    <input
                        id="result"
                        name="result"
                        className="StepsForm-Input"
                        onChange={onFieldChange}
                        value={form.result}
                        placeholder="форммат ввода в км 0.000"
                    />
                </section>
                <button className="StepsForm-Button">ОК</button>
            </form>
            {error && <p className="Error">{error}</p>}
            <WorkoutList 
                workoutList={workoutList} 
                onDeleteWorkout={onDeleteWorkout}
                onChangeWorkout={onChangeWorkout}
            />
        </>
    )
}

FormFiled.propTypes = {};
export default FormFiled;
