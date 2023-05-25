import React from 'react';
import PropTypes from 'prop-types';
import './WorkoutItem.css';

function WorkoutItem(props) {
    const { workout, onDeleteWorkout, onChangeWorkout } = props;

    const deleteWorkout = () => {
        return onDeleteWorkout(workout.id);
    };

    const changeWorkout = () => {
        return onChangeWorkout(workout.id);
    };


    return (
        <tr className="WorkoutItem-Work" key={workout.id}>
        <td>{workout.date}</td>
        <td>{workout.result}</td>
        <td>
            <span onClick={changeWorkout}>✎</span>
            <span onClick={deleteWorkout}>✘</span>
        </td>
    </tr>
    )
}

WorkoutItem.propTypes = {
    workout: PropTypes.shape({
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        result:  PropTypes.string.isRequired,
    }),
    onDeleteWorkout: PropTypes.func.isRequired,
    onChangeWorkout: PropTypes.func.isRequired,
}

export default WorkoutItem
