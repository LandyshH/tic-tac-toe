import React from 'react';
import {Button} from "@mui/material";

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