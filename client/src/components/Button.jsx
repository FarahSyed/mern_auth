import React from 'react';

function Button(props) {
    const { type, value, disabled, bgColor, onClick } = props;
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`bg-${bgColor} p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80`}>{value}</button>
    )
}

export default Button;