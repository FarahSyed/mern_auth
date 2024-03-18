import React from 'react';

function Input(props) {
    const { type, placeholder, name, id, required, className, onChange, onFocus, defaultValue, ref, hidden, accept } = props;
    return (
        <input type={type} placeholder={placeholder} name={name} id={id} required={required} onChange={onChange} onFocus={onFocus} defaultValue={defaultValue} ref={ref} hidden={hidden} accept={accept} className={`${className} bg-slate-100 p-3 rounded-lg`} />
    )
}

export default Input;