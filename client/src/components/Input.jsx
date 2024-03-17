import React from 'react';

function Input(props) {
    const { type, placeholder, name, id, required, className, onChange, onFocus, defaultValue, ref, hidden, accept } = props;
    return (
        <input type={type} placeholder={placeholder} name={name} id={id} required={required} onChange={onChange} ref={ref} hidden={hidden} accept={accept} onFocus={onFocus} defaultValue={defaultValue} className={`${className} bg-slate-100 p-3 rounded-lg`} />
    )
}

export default Input;