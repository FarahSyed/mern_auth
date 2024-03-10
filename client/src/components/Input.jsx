import React from 'react';

function Input(props) {
    const { type, placeholder, name, id, required, onChange, onFocus, defaultValue } = props;
    return (
        <input type={type} placeholder={placeholder} name={name} id={id} required={required} onChange={onChange} onFocus={onFocus} defaultValue={defaultValue} className='bg-slate-100 p-3 rounded-lg' />
    )
}

export default Input;