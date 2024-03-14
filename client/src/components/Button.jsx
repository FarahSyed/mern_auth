import React from 'react';

function Button(props) {
    const { type, value, disabled, className, onClick } = props;
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${className} p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80`}>{value}</button>
    )
}

export default Button;