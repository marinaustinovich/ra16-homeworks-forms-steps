import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import './HomeworksList.css';
import FormFiled from '../FormField/FormFiled';
import HomeworksItem from '../HomeworksItem/HomeworksItem';
import STATUSES from '../../data/statuses';
// import PropTypes from 'prop-types'

function HomeworksList(props) {
    const [homeworksList, setHomeworksList] = useState([]);
    const [filter, setFilter] = useState('All');

    const onFielChange = (value) => {
        onAddHomeworksList(value);
    }

    const onAddHomeworksList = (student) => {
        setHomeworksList((prevHomeworksList) => [
        ...prevHomeworksList ,
        {
            id: nanoid(),
            student,
            status: 'wait',
        },
        ]);
    };

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    };

    const onChangeStatus = (id, status) => {
        setHomeworksList(homeworks =>homeworks.map(h => {
            if (h.id === id) {
                return { ...h, status}
            }
            return h;
        }));
    };
    
    return (
        <>
            <h2>HomeworksList</h2>
            <select onChange={onFilterChange} value={filter}>
                <option value="all">All</option>
                {STATUSES.map(s => (<option key={nanoid()} value={s.type}>{s.type}</option>))}
            </select>
            <ul>
                {homeworksList
                .filter(homework => filter === 'all' || homework.status === filter)
                .map(homework => <HomeworksItem key={homework.id} homework={homework} onChangeStatus={onChangeStatus}/>)}
            </ul>
            <FormFiled onChange={onFielChange}/>  
        </>
    )
}

HomeworksList.propTypes = {}

export default HomeworksList
