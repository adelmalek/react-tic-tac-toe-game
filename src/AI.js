import { ROWS, COLS, createEmptyBoard, getDiagonal, getAllDiagonals} from '../../utilities';

export const artIntMove = (board, symbol) => {
    const utilities = createEmptyBoard(0);
    const diaglist = getAllDiagonals(board);
    // nézünk 5 egymással szomszédos cellát (vízsintes, függőleges, 2 átlós)
    // ha az ai-nek 5-ből 4 foglalt behúzzuk az 5.-et -> nyerés
    // ha ellenfélnek 5-ből 4 foglalt, behúzzuk az 5.-et -> védekezés
    // ellenfél lépéseivel szomszédos cella +1pont
    // az AI csak védekezik, nem feltétlenül győzni akar
}; 