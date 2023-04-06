export const ROWS = 10;
export const COLS = 10;

const transposingTwoDArray = (array) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
};

const diagonalListToArray = ({ horizontol, vertical, mainAndCross }) => {
    return [
        ...horizontol,
        ...vertical,
        ...mainAndCross.map(diag => diag.diagonal)
    ]
};

export const createEmptyBoard = (value = null) => {
    const board = [];

    for(let i = 0; i < ROWS; i += 1) {
        board.push([])
        for (let j = 0; j < COLS; j += 1) {
            board[i].push(value)
        }
    };

    return board;
};

export const getDiagonal = (board, x, y) => {
    const list = [];
    while(Array.isArray(board[x]) && typeof board[x][y] !== 'undefined') {
        list.push(board[x][y]);
        x += 1;
        y += 1;
    };

    return list;
};

export const getAllDiagonals = (board, verbose = false) => {
    const transposedBoard = transposingTwoDArray(board);

    const reversedBoard = board.map(row => [...row].reverse());

    let diagonalList = [];
    diagonalList.push({
        diagonal: getDiagonal(board, 0, 0),
        x: 0,
        y: 0,
        reversedBoard: false
    });
    diagonalList.push({
        diagonal: getDiagonal(reversedBoard, 0, 0),
        x: 0,
        y: 0,
        reversedBoard: true
    });
    for (let i = 1; i < Math.max(ROWS, COLS); i += 1) {
        diagonalList.push({
            diagonal: getDiagonal(board, 0, i),
            x: 0,
            y: i,
            reversedBoard: false
        });
        diagonalList.push({
            diagonal:getDiagonal(board, i, 0),
            x: i,
            y: 0,
            reversedBoard: false
        });
        diagonalList.push({
            diagonal: getDiagonal(reversedBoard, 0, i),
            x: 0,
            y: i,
            reversedBoard: true
        });
        diagonalList.push({
            diagonal: getDiagonal(reversedBoard, i, 0),
            x: i,
            y: 0,
            reversedBoard: true
        });
    }

    diagonalList = diagonalList.filter(array => array.diagonal.length >= 5);

    let allDiagonalList = {
        horizontol: [...board],
        vertical: [...transposedBoard],
        mainAndCross: diagonalList
    };

    return verbose? allDiagonalList : diagonalListToArray(allDiagonalList);
};

const getWinnerInRow = (row, symbol) => {
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

export const getWinner = (board, symbol) => {
    for (let row of board) {
        const winner = getWinnerInRow(row, symbol);
        if (winner !== null) {
            return winner;
        }
    };

    return null;
};

