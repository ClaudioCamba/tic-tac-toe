"use strict";

// Build board game and render function using module //
// Build control function using module approach
// Build players using factory function approach //

// Board game render on page //
// Player given name 
// When player click symbol added to clicked square
// Symbol updated on to board game array
// Game control checks to see if player won
// Function to clear grids / Restart

// Players ====================================================================
const playerFactory = (name, mark) => {
    // let countTurns = 0;
    let clickedGrid = [];
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => clickedGrid;
    const takeTurn = (grd) => clickedGrid.push(grd);
    return { getName, getMark, getCount, takeTurn }
};

const player1 = playerFactory('max', 'X');
const player2 = playerFactory('dom', 'O');
const playerTurns = () => player1.getCount().length <= player2.getCount().length ? player1 : player2; // Controls players turn


// Board ====================================================================
const gameBoard = (function () {
    const _board = ['', '', '', '', '', '', '', '', ''],
        _body = document.querySelector('body');

    const _buildBoard = () => {
        const wrap = document.createElement('ul');
        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];

            // Click eventlistner on individual grids
            grid.addEventListener('click', (e) => {
                if (_board.includes('')) { // Check to make sure board has empty spaces
                    let playa = playerTurns();

                    if (e.target.innerText === '') {
                        _board[i] = playa.getMark();
                        e.target.innerText = _board[i];
                        playa.getCount().push(i);
                        displayController.checkGame(playa, _board);
                    }
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
const displayController = (function () {

    const checkGame = (ply, brd) => {
        const winIndex = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        // Check if win
        // if (ply.getCount().length >= 3) {
        for (let numbers of winIndex) {
            if (ply.getCount().includes(numbers[0]) && ply.getCount().includes(numbers[1]) && ply.getCount().includes(numbers[2])) {
                console.log(ply.getName() + ' WINNER')
                break;
            } else {
                console.log('no match');
            }
        }
    }


    // if an player reaches 3+ check
    // if board grids are full check


    return { checkGame };
})();








