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
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => countTurns;
    const takeTurn = () => countTurns++;
    return { getName, getMark, getCount, takeTurn }
};

const player1 = playerFactory('max', 'X');
const player2 = playerFactory('dom', 'O');

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
                console.log(_board[e.target.dataset.index]);
                console.log(e)
                console.log(player1.getMark());
                if (player1.getCount() <= player2.getCount()) {
                    e.target.innerText = player1.getMark();
                    player1.takeTurn();
                } else {
                    e.target.innerText = player2.getMark();
                    player2.takeTurn();
                }
                
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







