import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FormFiled(props) {
    const { onChange } = props;
    const [val, setValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onChange(val);
        setValue('');
    }

    const onValueChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value);
    }
    return (
        <form onSubmit={onSubmit}>
            <input className="HomeworksList-Add" onChange={onValueChange} value={val}/>
        </form>
    )
}

FormFiled.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default FormFiled
