import './GameBoard.css';
import { useState } from 'react';

import Menu from '../Menu/Menu';

import { 
    createEmptyBoard, 
    getAllDiagonals,
    getWinner
} from '../../utilities';

const GameBoard = () => {
    const [board, setBoard] = useState(createEmptyBoard());
    const [symbol, setSymbol] = useState("🦄");
    const [winner, setWinner] = useState(null);

    
    const handleCellClick = (e) => {
        const { row, col} = e.target.dataset;

        if (board[row][col] !== null || winner !== null) return;
        
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = symbol;

        setWinner(getDiagonalList(newBoard));
        setBoard(newBoard);
        setSymbol(symbol === "🦄" ? "🐲 " : "🦄");
    };

    const createRowJSX = (row, rowIndex) => {
        const cells = [];

        for (let i = 0; i < board.length; i += 1) {
            let style = "cell";

            if (row[i] === null && winner === null) {
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
        setSymbol('🦄');
        setWinner(null);
    };

    const getDiagonalList = (board) => {
        const diagonalList = getAllDiagonals(board);

        return getWinner(diagonalList, symbol);
    };

    return (
        <div className="container">
            <h1>Tic Tac Toe</h1>
            <Menu resetGame={resetGame}/>
            {createBoardJSX()}
            {winner === null? 
                <h2>Winner is: <span>&emsp;</span></h2> : 
                <h2>Winner is: <span>{winner}</span></h2>
            }
        </div>
    )
};

export default GameBoard;