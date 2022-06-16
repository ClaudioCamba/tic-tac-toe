"use strict";

// Build board game and render function using module //
// Build control function using module approach //
// Build players using factory function approach //

// Board game render on page //
// Player given name - in the dom
// When player click symbol added to clicked square //
// Symbol updated on to board game array
// Game control checks to see if player won
// Function to clear grids / Restart

// Players ====================================================================
const playerFactory = (name, mark) => {
    let clickedGrid = [];
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => clickedGrid;
    return { getName, getMark, getCount }
};

const player1 = playerFactory('max', 'X');
const player2 = playerFactory('dom', 'O');
const playerTurns = () => player1.getCount().length <= player2.getCount().length ? player1 : player2; // Controls players turn

const userInterface = (() => {

    const _inputSection = () => {
        const domDiv = document.createElement('div'); // Create wrapper
        const title = document.createElement('h1'); // Main title
        const subTitle = document.createElement('h3'); // Main title
        const restartBtn = document.createElement('button'); // Restart button

        title.innerText = 'Tic Tac Toe';
        subTitle.innerText = 'Enter names and click start button';
        restartBtn.innerText = 'Start';

        domDiv.appendChild(title);
        domDiv.appendChild(subTitle);
        domDiv.appendChild(restartBtn);

        // Create input elements
        for (let u = 1; u < 3; u++) {
            const label = document.createElement('label');
            const input = document.createElement('input');
            label.setAttribute('for', 'player' + u);
            label.innerText = 'player' + u;
            input.type = 'text';
            input.placeholder = 'Enter Player' + u + ' Name'
            input.id = 'player' + u;
            label.appendChild(input);
            domDiv.appendChild(label);
        }

        return domDiv;
    }

    function renderInputSection() {
        document.querySelector('body').appendChild(_inputSection())
    }

    // const reStartBtn = () => {
    //     document.createElement('button');
    // }

    return { renderInputSection }
})();


// Board ====================================================================
const gameBoard = (function () {
    const _board = ['', '', '', '', '', '', '', '', ''];
    // const _body = document.querySelector('body');
    const _endGame = [];


    const _buildBoard = () => {
        const wrap = document.createElement('ul');
        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];

            // Click eventlistner on individual grids
            grid.addEventListener('click', (e) => {
                if (_endGame.includes(true) === false) {
                    gameControl.getData(_board, e, i, _endGame); // Send data to game controller
                    gameControl.updateBoard(); // Update game board and player
                    gameControl.gameStatus(); // Check for win / tie or turn 
                    console.log(_board);
                }
            });

            wrap.appendChild(grid);
        }
        return wrap;
    };

    function renderBoard() {
        document.querySelector('body').appendChild(_buildBoard());
    }

    return {
        renderBoard
    };
})();

// Controls ====================================================================
const gameControl = (function () {

    let _data = {
        board: null,
        elem: null,
        index: null,
        player: null,
        winner: null,
        endGame: null,
        winNum: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    }

    // Get data and store
    const getData = (b, e, i, g) => {
        _data.board = b;
        _data.elem = e;
        _data.index = i;
        _data.endGame = g;
        _data.player = playerTurns();
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
        // Check win
        const checkWin = (arr) => {
            for (let num of _data.winNum) {
                if (arr.includes(num[0]) && arr.includes(num[1]) && arr.includes(num[2])) { return _data.player; }
            }
        };

        // Check tie / turn
        if (checkWin(_data.player.getCount()) != undefined) {
            console.log(_data.player.getName() + ' winner');
            _data.endGame.push(true);
        } else {
            if (_data.board.includes('') === false) {
                console.log('draw');
                _data.endGame.push(true);
            } else {
                console.log(playerTurns().getName() + ' its your turn')
            }
        };
    }

    return {
        getData,
        updateBoard,
        gameStatus
    };
})();

userInterface.renderInputSection();
gameBoard.renderBoard(); // Render




