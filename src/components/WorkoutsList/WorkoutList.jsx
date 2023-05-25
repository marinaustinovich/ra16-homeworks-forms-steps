import React from 'react';
import './WorkoutList.css';
import WorkoutItem from '../WorkoutItem/WorkoutItem';
import PropTypes from 'prop-types'

function WorkoutList(props) {
    const { workoutList, onDeleteWorkout, onChangeWorkout } = props;

    const sortedWorkoutList = [...workoutList].sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('.'));
        const dateB = new Date(b.date.split('.').reverse().join('.'));
        return dateB - dateA;
    });

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
}

WorkoutList.propTypes = {
    workoutList:  PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.string,
    })
    ).isRequired,
    onDeleteWorkout: PropTypes.func.isRequired,
    onChangeWorkout: PropTypes.func.isRequired,
};

export default WorkoutList;
