import React from 'react';

function Input(props) {
    const { type, placeholder, name, id, onChange, defaultValue } = props;
    return (
        <input type={type} placeholder={placeholder} name={name} id={id} onChange={onChange} defaultValue={defaultValue} className='bg-slate-100 p-3 rounded-lg' />
    )
}

export default Input;