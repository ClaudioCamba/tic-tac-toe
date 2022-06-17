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
    const winMsg = () => name + ' wins!';
    const startMsg = () => name + ' starts first';
    const turnMsg = () => name + ' its your turn';
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => clickedGrid;
    return { getName, getMark, getCount, winMsg, turnMsg, startMsg }
};

let player1, player2;
const playerTurns = () => player1.getCount().length <= player2.getCount().length ? player1 : player2; // Controls players turn

const userInterface = (() => {
    const domDiv = document.createElement('div'); // Create wrapper
    const title = document.createElement('h1'); // Main title
    const subTitle = document.createElement('h3'); // Main title
    const restartBtn = document.createElement('button'); // Restart button
    let input1 = null;
    let input2 = null;

    // Construct input section
    const _inputSection = () => {

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
            label.innerText = 'Player ' + u;
            input.type = 'text';
            input.placeholder = 'Enter Player ' + u + ' Name'
            input.id = 'player' + u;
            label.appendChild(input);
            domDiv.appendChild(label);

            u === 1 ? input1 = input : input2 = input;
        }

        // Add functionality to start button
        restartBtn.addEventListener('click', (e) => {
            if (input1.value && input2.value) {
                if (input1.value != input2.value) {
                    e.target.innerText = 'Restart';
                    player1 = playerFactory(input1.value, 'X');
                    player2 = playerFactory(input2.value, 'O');
                    input1.value = '';
                    input2.value = '';

                    subTitle.innerText = playerTurns().startMsg();
                    gameBoard.boardOpenClose(true);
                } else {
                    console.log('cant have the same name');
                }

            } else {
                console.log('I need names')
            }
        });

        return domDiv;
    }

    const renderInputSection = () => { document.querySelector('body').appendChild(_inputSection()) };
    const updateMessage = (txt) => { subTitle.innerText = txt };

    return { renderInputSection, updateMessage }
})();


// Board ====================================================================
const gameBoard = (function () {
    const _board = ['', '', '', '', '', '', '', '', ''];
    // const _body = document.querySelector('body');
    const _openBoard = [false];

    const _buildBoard = () => {
        const wrap = document.createElement('ul');
        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];

            // Click eventlistner on individual grids
            grid.addEventListener('click', (e) => {
                if (_openBoard.includes(true)) {
                    gameControl.getData(_board, e, i, _openBoard); // Send data to game controller
                    gameControl.updateBoard(); // Update game board and player
                    gameControl.gameStatus(); // Check for win / tie or turn 
                    console.log(_board);
                } else {
                    console.log('enter names please')
                }
            });

            wrap.appendChild(grid);
        }
        return wrap;
    };

    function renderBoard() { document.querySelector('body').appendChild(_buildBoard()) }
    function boardOpenClose(tf) { _openBoard.splice(0, 1, tf) }

    return {
        renderBoard,
        boardOpenClose
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
        // subtitle: document.querySelector('div > h3'),
        // startButton: document.querySelector('div > button'),
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
            gameBoard.boardOpenClose(false);
        } else {
            if (_data.board.includes('') === false) {
                console.log('draw');
                gameBoard.boardOpenClose(false);
            } else {
                console.log(playerTurns().getName() + ' its your turn')
                userInterface.updateMessage(playerTurns().turnMsg());
            }
        };
    }



    return {
        getData,
        updateBoard,
        gameStatus
    };
})();

userInterface.renderInputSection(); // Render input section
gameBoard.renderBoard(); // Render game board

document.querySelector('#player1').value = 'claudio';
document.querySelector('#player2').value = 'mina';



