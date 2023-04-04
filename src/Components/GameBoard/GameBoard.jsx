import './GameBoard.css';
import { useState } from 'react';

import Menu from '../Menu/Menu';

const ROWS = 10;
const COLS = 10;

const transposingTwoDArray = (array) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
};

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
    const [symbol, setSymbol] = useState('X');
    const [winner, setWinner] = useState(null);

    
    const handleCellClick = (e) => {
        const { row, col} = e.target.dataset;

        if (board[row][col] !== null) return;
        
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col] = symbol;

        setWinner(getDiagonalList(newBoard));
        setBoard(newBoard);
        setSymbol(symbol === 'X'? 'O' : 'X');
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

    const getWinnerInRow = (row) => {
        let symbolCount = 0;
        for (let cell of row) {
            if (cell === symbol) {
                symbolCount += 1;
            } else {
                symbolCount = 0;
            }

            if (symbolCount === 5) {
                return symbol;
            }
        };

        return null;
    };

    const getWinner = (board) => {
        for (let row of board) {
            const winner = getWinnerInRow(row)
            if (winner !== null) {
                return winner;
            }
        };

        return null;
    };

    const getDiagonal = (board, x, y) => {
        const list = [];
        while(Array.isArray(board[x]) && typeof board[x][y] !== 'undefined') {
            list.push(board[x][y]);
            x += 1;
            y += 1;
        };

        return list;
    };

    const getDiagonalList = (board) => {
        const transposedBoard = transposingTwoDArray(board);

        let diagonalList = [
            ...board,              // horizontol
            ...transposedBoard,    // vertical
        ];

        const reversedBoard = board.filter(row => [...row].reverse());

        diagonalList.push(getDiagonal(board, 0, 0));
        diagonalList.push(getDiagonal(reversedBoard, 0, 0));
        for (let i = 1; i < Math.max(ROWS, COLS); i += 1) {
            diagonalList.push(getDiagonal(board, 0, i));
            diagonalList.push(getDiagonal(board, i, 0));
            diagonalList.push(getDiagonal(reversedBoard, 0, i));
            diagonalList.push(getDiagonal(reversedBoard, i, 0));
        }

        diagonalList = diagonalList.filter(array => array.length >= 5);

        return getWinner(diagonalList);
    };

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <Menu resetGame={resetGame}/>
            {createBoardJSX()}
            <p>Winner is: {winner}</p>
        </>
    )
};

export default GameBoard;