"use strict";

// Build board game and render function using module
// Build control function using module approach
// Build players using factory function approach

// Board game render on page
// Player given name
// When player click symbol added to clicked square
// Symbol updated on to board game array
// Game control checks to see if player won
// Function to clear grids / Restart

// Players ====================================================================
const playerFactory = (name, mark) => {
    let countTurns = 0;
    let clickedGrid = [];
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => countTurns;
    // const takeTurn = (grid) => clickedGrid[];
    return { getName, getMark, getCount, takeTurn }
};

const player1 = playerFactory('max', 'X');
const player2 = playerFactory('dom', 'O');

const playerTurns = () => {
    let player;
    if (player1.getCount() <= player2.getCount()) {
        return player = player1
    } else {
        return player = player2;
    }
}


// Board ====================================================================
const gameBoard = (function () {
    const _board = ['', '', '', '', '', '', '', '', ''],
        _body = document.querySelector('body');

    const _buildBoard = () => {
        const wrap = document.createElement('ul');
        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];
            // grid.setAttribute('data-index', i);
            grid.addEventListener('click', (e) => {
                // console.log(_board[e.target.dataset.index]);
                console.log(e)
                e.target.innerText = playerTurns().getMark();
                _board[i] = playerTurns().getMark();

                console.log(_board);
                
            });
            wrap.appendChild(grid);
        }
        return wrap;
    };

    function renderBoard() {
        _body.appendChild(_buildBoard());
    }

    return {
        renderBoard
    };
})();

gameBoard.renderBoard(); // Render

// Controls ====================================================================
// const displayController = (function () {
    


//     return {};
// })();







