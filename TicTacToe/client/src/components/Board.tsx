import { Button } from '@mui/material';
import React, {useState} from 'react';
import {Square} from "./Square";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

interface BoardProps {
    squaresInRow: number;
}

export const Board = ({squaresInRow}: BoardProps) => {

    const squaresCount = squaresInRow * squaresInRow;
    const [squares, setSquares] = useState(Array(squaresCount).fill(null));
    const [isX, setIsX] = useState(true);

    const handleRestart = () => {
        setIsX(true)
        setSquares(Array(9).fill(null))
    }

    const handleClick = (i: number) => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = isX ? 'X' : 'O';
        setSquares(squares);
        setIsX(!isX);
    }

    const winner = calculateWinner(squares)
    let status

    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = 'Next player: ' + (isX ? 'X' : 'O');
    }

    function generateWinningPatterns(count: number) {
        const winningPatterns = [];
        // Horizontal patterns
        for (let i = 0; i < count; i++) {
            let row = [];
            for (let j = i; j < count * count; j += count) {
                row.push(j);
            }
            winningPatterns.push(row);
        }
        //Vertical Patterns
        for (let i = 0; i < count; i++) {
            let col = [];
            for (let j = i; j < count * count; j += count) {
                col.push(j);
            }
            winningPatterns.push(col);
        }

        //Diagonal Patterns
        let diag1 = [];
        for (let i = 0; i < count * count; i += (count + 1)) {
            diag1.push(i);
        }

        winningPatterns.push(diag1);

        let diag2 = [];
        for (let i = count - 1; i <= count * (count - 1); i += (count - 1)) {
            diag2.push(i);
        }

        winningPatterns.push(diag2);

        return winningPatterns;
    }


    function calculateWinner(squares: any) {
        const winningPatterns = generateWinningPatterns(squaresInRow);

        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i];

           // console.log(a, b, c);

            console.log(squares[a]);
            console.log(squares[b]);
            console.log(squares[c]);
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    let squaresRow = [];
    const rows = [];

    for (let j = 0; j < squaresInRow; j++) {

        squaresRow = [];

        for (let i = 0; i < squaresInRow; i++) {
            let index = squaresInRow * j + i;
            squaresRow.push(<Square value={squares[index]} onClick={() => handleClick(index)}/>);
        }

        rows.push(<div className={"squares-row"}>
            {squaresRow}
        </div>)
    }

    return (
        <div className={"board-container"}>
            {rows}
            <div className="status">{status}</div>
            <div className={"restart-button"} >
                <Button color={"inherit"} variant="outlined" onClick={handleRestart} fullWidth={true}>Restart</Button>
            </div>
        </div>
    );
};

