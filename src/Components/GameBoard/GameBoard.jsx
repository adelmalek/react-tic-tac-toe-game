import './GameBoard.css';
import { useState } from 'react';

const ROWS = 10;
const COLS = 10;

const GameBoard = () => {
    const createEmptyBoard = () => {
        const board = [];

        for(let i = 0; i < ROWS; i += 1) {
            board.push([])
            for (let j = 0; j < COLS; j += 1) {
                board[i].push(null)
            }
        };

        return board;
    };

    const [board, setBoard] = useState(createEmptyBoard());

    const createRowJSX = (row, rowIndex) => {
        const cells = [];

        for (let i = 0; i < board.length; i += 1) {
            let style = "cell";

            if (row[i] === null) {
                style += " empty-cell"
            }

            cells.push(<td className={style}>{row}</td>)
        };

        return (
             <tr>
                {cells}
            </tr>
        )
    };

    const createBoardJSX = () => {
        const rows = [];

        for (let i = 0; i < board.length; i += 1) {
            rows.push(createRowJSX(board[i], i))
        };

        return (
            <table className="board">
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    };


    return (
        <>
            <h2>GameBoard</h2>
            {createBoardJSX()}
        </>
    )
};

export default GameBoard;