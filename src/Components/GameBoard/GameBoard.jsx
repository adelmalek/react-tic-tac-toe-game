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

    
    const handleCellClick = (e) => {
        const { row, col} = e.target.dataset;

        if (board[row][col] !== null) return;
        
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = 'X';

        setBoard(newBoard);
    };

    const createRowJSX = (row, rowIndex) => {
        const cells = [];

        for (let i = 0; i < board.length; i += 1) {
            let style = "cell";

            if (row[i] === null) {
                style += " empty-cell"
            }

            cells.push(
                <td 
                    className={style} 
                    key={JSON.stringify({row, rowIndex, i})}
                    onClick={handleCellClick}
                    data-row={rowIndex}
                    data-col={i}
                >
                    {row[i]}
                </td>
            )
        };

        return (
             <tr key={JSON.stringify({row, rowIndex})}>
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

    const resetGame = () => {
        setBoard(createEmptyBoard());
    };

    return (
        <>
            <h2>GameBoard</h2>
            <button onClick={resetGame}>New Game</button>
            {createBoardJSX()}
        </>
    )
};

export default GameBoard;