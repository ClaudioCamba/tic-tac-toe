"use strict";

// Game Players ====================================================================

const playerAI = (arr) => {
    const array = arr;

    const random = () => {
        let slot = null;
        while (slot === null && arr.includes('')) {
            const ranNum = Math.floor(Math.random() * arr.length);
            if (arr[ranNum].length === 0) {
                slot = ranNum;
                return slot;
            };
        }
    }
    return { random }
}

const playerFactory = (name, mark) => {
    let clickedGrid = [];
    const winMsg = () => name + ' (' + getMark() + ') wins!';
    const startMsg = () => name + ' (' + getMark() + ') starts first';
    const turnMsg = () => name + ' (' + getMark() + ') its your turn';
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => clickedGrid;
    return { getName, getMark, getCount, winMsg, turnMsg, startMsg }
};

let playerX, playerO;
const playerTurns = () => playerX.getCount().length <= playerO.getCount().length ? playerX : playerO; // Controls players turn

// Game Input & Notification ====================================================================
const userInterface = (() => {
    const domDiv = document.createElement('div'); // Create wrapper
    const title = document.createElement('h1'); // Main title
    const subTitle = document.createElement('h3'); // Main title
    const restartBtn = document.createElement('button'); // Restart button
    let inputX = null;
    let inputO = null;
    let pNames = {
        x: '',
        o: ''
    }

    // Construct input section
    const _inputSection = () => {
        title.innerText = 'Tic Tac Toe';
        subTitle.innerText = 'Enter names & click Start / Restart';
        restartBtn.innerText = 'Start / Restart';
        restartBtn.classList.add('startRestart');
        domDiv.appendChild(title);
        domDiv.appendChild(subTitle);
        domDiv.appendChild(restartBtn);

        // Create input elements
        for (let u = 1; u < 3; u++) {
            const s = () => u === 1 ? 'X' : 'O';
            const label = document.createElement('label');
            const input = document.createElement('input');
            label.setAttribute('for', 'player' + s());
            label.innerText = 'Player ' + s();
            input.type = 'text';
            input.placeholder = 'Enter Player ' + s() + ' Name'
            input.id = 'player' + s();
            label.appendChild(input);
            domDiv.appendChild(label);
            u === 1 ? inputX = input : inputO = input;
        }

        // Add functionality to start button
        restartBtn.addEventListener('click', (e) => {
            if (playerX != undefined && playerO != undefined) {
                if (playerX.getName() === pNames.x.getName() && playerX.getName() === pNames.x.getName()) {
                    inputX.value = pNames.o.getName();
                    inputO.value = pNames.x.getName();
                }
            };

            if (inputX.value && inputO.value) {
                gameBoard.resetBoard();
                playerX = playerFactory(inputX.value, 'X');
                playerO = playerFactory(inputO.value, 'O');
                pNames.x = playerX;
                pNames.o = playerO;
                subTitle.innerText = playerTurns().startMsg();
                gameBoard.boardOpenClose(true);
            } else {
                userInterface.updateMessage('Enter players X & O names!');
                inputX.value = 'Player 1';
                inputO.value = 'Player 2';
            }
        });

        return domDiv;
    }

    const renderInputSection = () => { document.querySelector('body').appendChild(_inputSection()) };
    const updateMessage = (txt) => { subTitle.innerText = txt };

    return { renderInputSection, updateMessage }
})();


// Game Board ====================================================================
const gameBoard = (function () {
    let _board = ['', '', '', '', '', '', '', '', ''];
    const _openBoard = [false];
    const wrap = document.createElement('ul');

    const _buildBoard = () => {

        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];

            // Click eventlistner on individual grids
            grid.addEventListener('click', (e) => {
                if (_openBoard.includes(true)) {
                    gameControl.getData(_board, e, i, _openBoard); // Send data to game controller
                    gameControl.updateBoard(); // Update game board and player
                    gameControl.gameStatus(); // Check for win / tie or turn 

                } else {
                    document.querySelector('body > div > button').click();
                }

                // AI Player
                if (playerTurns().getMark() === 'O' && _board.includes('') && _openBoard.includes(true)) {
                    document.querySelectorAll('ul>li')[playerAI(_board).random()].click();
                };

            });

            wrap.appendChild(grid);
        }
        return wrap;
    };

    function renderBoard() { document.querySelector('body').appendChild(_buildBoard()) }
    function boardOpenClose(trueFalse) { _openBoard.splice(0, 1, trueFalse) };
    function resetBoard() {
        _board = ['', '', '', '', '', '', '', '', '']; // Reset board
        wrap.innerHTML = ''; // Delete all child nodes / li
        wrap.remove(); // Remove DOM element
        renderBoard(); // Re-insert DOM element
    }

    return { renderBoard, boardOpenClose, resetBoard };
})();

// Game Controls ====================================================================
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
            userInterface.updateMessage(_data.player.winMsg());
            gameBoard.boardOpenClose(false);
        } else {
            if (_data.board.includes('') === false) {
                userInterface.updateMessage('Its a draw!');
                gameBoard.boardOpenClose(false);
            } else {
                userInterface.updateMessage(playerTurns().turnMsg());
            }
        };

        // AI Player
        // if (playerTurns().getMark() === 'O') {
        //     document.querySelectorAll('ul>li')[playerAI(_data.board).random()];
        // }



    }

    return { getData, updateBoard, gameStatus };
})();

userInterface.renderInputSection(); // Render input section
