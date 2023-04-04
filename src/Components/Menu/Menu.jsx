import './Menu.css';

const Menu = ({resetGame}) => {

    return (
        <div>
            <button onClick={resetGame} className='button'>New Game</button>
        </div>
    )
};

export default Menu;