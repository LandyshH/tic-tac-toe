import React from 'react';

interface SquareProps {
    value: any;
    onClick: any;
}

export const Square = ({value, onClick} : SquareProps) => {
    return (
        <button className={"square-button"} onClick={onClick}>
            {value}
        </button>
    );
};