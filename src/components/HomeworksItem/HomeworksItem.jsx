import React from 'react';
import { nanoid } from 'nanoid';
import STATUSES from '../../data/statuses';
import PropTypes from 'prop-types';
import './HomeworksItem.css';

function HomeworksItem(props) {
    const { homework, onChangeStatus } = props;

    const onStatusClick = (newStatus) => {
        return onChangeStatus(homework.id, newStatus);
    };

    return (
        <li key={homework.id} className={`HomeworksItem-Work HomeworksItem-Work_Status_${homework.status}`}>
            Homework {homework.student}
            {STATUSES.map((s) => (
                <button 
                    key={nanoid()} 
                    className={`HomeworksItem-Button HomeworksItem-Button_${s.type}`} onClick={() => onStatusClick(s.type)}>
                            {s.title}
                </button>
            ))}
        </li>
    )
}

HomeworksItem.propTypes = {
    homework: PropTypes.shape({
            student: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            status:  PropTypes.string.isRequired,
    })
}

export default HomeworksItem
