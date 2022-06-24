"use strict";

// Game Players ====================================================================

const playerAI = (arr) => {
    const computer_LV1 = () => {
        let slot = null;
        while (slot === null && arr.includes('')) {
            const ranNum = Math.floor(Math.random() * arr.length);
            if (arr[ranNum].length === 0) {
                slot = ranNum;
                return slot;
            };
        }
    }
    return { computer_LV1 }
}

const playerFactory = (name, mark) => {
    let clickedGrid = [];
    let storeWin = [];

    const turnAI = (a) => {
        if (playerTurns().getName().indexOf('computer_LV') > -1) {
            return document.querySelectorAll('ul>li')[playerAI(a)[name]()].click();
        }
    }
    const setWin = (i) => storeWin.push(i);
    const resetCount = () => clickedGrid = [];
    const winMsg = () => name + ' (' + getMark() + ') wins!';
    const startMsg = () => name + ' (' + getMark() + ') starts first';
    const turnMsg = () => name + ' (' + getMark() + ') its your turn';
    const getMark = () => mark;
    const getName = () => name;
    const getCount = () => clickedGrid;
    const getWin = () => storeWin;
    return { getName, getMark, getCount, winMsg, turnMsg, startMsg, turnAI, resetCount, setWin, getWin }
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

            if (inputX.value && inputO.value) {

                // if its restart
                if (playerX != undefined && playerO != undefined) {
                    console.log(pNames);
                    if (playerX.getName() === pNames.x.getName() && playerX.getName() === pNames.x.getName()) {
                        playerX.resetCount();
                        playerO.resetCount();

                        pNames.x = Object.assign(playerX);
                        pNames.o = Object.assign(playerO);

                        // Swapping input values
                        inputX.value = pNames.o.getName();
                        playerX = Object.assign(pNames.o);
                        inputO.value = pNames.x.getName();
                        playerO = Object.assign(pNames.x);

                        pNames.x = Object.assign(playerX);
                        pNames.o = Object.assign(playerO);
                    }
                } else {
                    playerX = playerFactory(inputX.value, 'X');
                    playerO = playerFactory(inputO.value, 'O');
                    pNames.x = Object.assign(playerX);
                    pNames.o = Object.assign(playerO);
                };
                // if its new
                gameBoard.resetBoard();
                subTitle.innerText = playerTurns().startMsg();
                gameBoard.boardOpenClose(true);

            } else {
                userInterface.updateMessage('Enter players X & O names!');
                inputX.value = 'Player 1';
                inputO.value = 'Player 2';
            }

            playerTurns().turnAI(gameBoard.getBoard());
        });

        return domDiv;
    }

    const renderInputSection = () => { document.querySelector('body').appendChild(_inputSection()) };
    const updateMessage = (txt) => { subTitle.innerText = txt };

    return { renderInputSection, updateMessage }
})();

// Game Board ====================================================================
const gameBoard = (function () {
    let boardS = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => { return boardS };
    const _openBoard = [false];
    const wrap = document.createElement('ul');

    const _buildBoard = () => {

        for (let i = 0; i < boardS.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = boardS[i];

            // Click eventlistner on individual grids
            grid.addEventListener('click', (e) => {
                if (_openBoard.includes(true)) {
                    gameControl.getData(boardS, e, i, _openBoard); // Send data to game controller
                    gameControl.updateBoard(); // Update game board and player
                    gameControl.gameStatus(); // Check for win / tie or turn 
                    console.log(playerX.getName() + ' ' + playerX.getCount());
                    console.log(playerO.getName() + ' ' + playerO.getCount());
                } else {
                    document.querySelector('body > div > button').click();
                }
            });

            wrap.appendChild(grid);
        }
        return wrap;
    };

    function renderBoard() { document.querySelector('body').appendChild(_buildBoard()) }
    function boardOpenClose(trueFalse) { _openBoard.splice(0, 1, trueFalse) };
    function resetBoard() {
        boardS = ['', '', '', '', '', '', '', '', '']; // Reset board
        wrap.innerHTML = ''; // Delete all child nodes / li
        wrap.remove(); // Remove DOM element
        renderBoard(); // Re-insert DOM element
    }

    return { renderBoard, boardOpenClose, resetBoard, getBoard };
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
            // Store score
            _data.player.setWin(2);
            playerTurns().setWin(0);

            userInterface.updateMessage(_data.player.winMsg());
            gameBoard.boardOpenClose(false);
        } else {
            if (_data.board.includes('') === false) {
                // Store score
                _data.player.setWin(1);
                playerTurns().setWin(1);

                userInterface.updateMessage('Its a draw!');
                gameBoard.boardOpenClose(false);
            } else {
                userInterface.updateMessage(playerTurns().turnMsg());
                playerTurns().turnAI(gameBoard.getBoard());
            }
        };

    }

    return { getData, updateBoard, gameStatus };
})();

userInterface.renderInputSection(); // Render input section

document.querySelector('#playerX').value = 'computer_LV1';
document.querySelector('#playerO').value = 'Human';

const suggestionBot = ((self, app) => {
    let testing = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let hold = {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': []
    }

    for (let x = 0; x < testing.length; x++) {
        // console.log(testing[x])
        for (let i = 0; i < testing[x].length; i++) {
            console.log(testing[x][i])
            hold[testing[x][i]].push(testing[x]);
        }
    }

    console.log(hold);
})();

let player = {
    clicked: [0],
    options: [],
}

let opponent = {
    clicked: [0],
    options: [],
}


