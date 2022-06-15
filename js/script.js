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

                displayController.getData(_board, e, i); // Send data to game controller
                displayController.updateBoard(); // Update game board and player
                displayController.gameStatus();

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

    let _data = {
        board: null,
        elem: null,
        index: null,
        player: null,
        winner: null,
        winNum: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    }

    // Get data and store
    const getData = (b, e, i) => {
        _data.board = b;
        _data.elem = e;
        _data.index = i;
        _data.player = playerTurns();
        console.log(_data);
    }

    // Update game board
    const updateBoard = () => {
        if (_data.elem.target.innerText === '' && _data.board[_data.index].length === 0) {
            _data.board[_data.index] = _data.player.getMark();
            _data.elem.target.innerText = _data.board[_data.index];
            _data.player.getCount().push(_data.index);
        }
    };

    // Check game status
    const gameStatus = () => {
        // If win
        for (let numbers of _data.winNum) {
            if (_data.player.getCount().includes(numbers[0]) && _data.player.getCount().includes(numbers[1]) && _data.player.getCount().includes(numbers[2])) {
                console.log(_data.player.getName() + ' WINNER')
                break;
            } else if (!_data.board.includes('')) {
                console.log('draw');
                break;
            } else {
                console.log(playerTurns().getName() + ' its your turn')
            }
        }
    }

    return {
        getData,
        updateBoard,
        gameStatus
    };
})();








