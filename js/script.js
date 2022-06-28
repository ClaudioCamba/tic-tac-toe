"use strict";

// Game Players ====================================================================

const playerAI = (main_board) => {

    function getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }

    let randomReturn = (array) => {
        let slot = null;
        while (slot === null && main_board.includes('')) {
            const ranNum = array[Math.floor(Math.random() * array.length)];
            if (main_board[ranNum].length === 0) {
                slot = ranNum;
                console.log('slot ' + slot)
                return slot;
            };
        }
    };

    const computer_LV2 = () => {
        console.log('NEW ROUND');
        let winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let self = { sym: playerTurns().getMark(), op: [], priority: [[], [], []] };
        let other = { sym: playerTurns().getMark() === 'X' ? 'O' : 'X', op: [], priority: [[], [], []] };
        let board = main_board;
        let chosen;

        // Update game board
        for (let x = 0; x < winArray.length; x++) {
            for (let o = 0; o < winArray[x].length; o++) {
                if (board[winArray[x][o]] !== '') { winArray[x][o] = board[winArray[x][o]]; }
            }
        };

        // Store options available for both players
        for (const arr of winArray) {
            if (arr.indexOf(self.sym) < 0) { other.op.push(arr); }
            if (arr.indexOf(other.sym) < 0) { self.op.push(arr); }
        };

        // check if others options are close
        const players = [self, other];
        players.forEach((player) => {
            for (const arr of player.op) {
                for (const val of arr) {
                    if (getOccurrence(arr, player.sym) === 2) {
                        if (typeof val === 'number' && player.priority[0].indexOf(val) < 0) {
                            player.priority[0].push(val);
                        }
                    } else if (getOccurrence(arr, player.sym) === 1) {
                        if (typeof val === 'number' && player.priority[2].indexOf(val) < 0) {
                            player.priority[2].push(val);
                        }
                    }
                }
            }
        });

        if (other.priority[2].length > 0) {
            if (self.priority[2].length <= 0) {
                self.priority[2] = other.priority[2]
            } else {
                for (const priority of self.priority[2]) {
                    if (other.priority[2].indexOf(priority) > -1) {
                        self.priority[1].push(priority);
                    };
                }
            }
        }

        console.log('BEFORE CHOSEN')
        console.log(self)
        console.log(other);

        if (self.priority[0].length > 0) {
            chosen = randomReturn(self.priority[0]);
            console.log('test1')
        } else if (other.priority[0].length > 0) {
            chosen = randomReturn(other.priority[0]);
            console.log('test2')
        } else if (board[4] === other.sym && getOccurrence(board, other.sym) === 1) {
            chosen = randomReturn([0, 2, 6, 8]);
            console.log('test3')
        } else if (board[0] === other.sym || board[2] === other.sym || board[6] === other.sym || board[8] === other.sym && getOccurrence(board, other.sym) < 2) {
            if (board[4] === other.sym || board[4] === self.sym) {
                if (self.priority[1].length > 0) {
                    chosen = randomReturn(self.priority[1]);
                    console.log('test4.1')
                } else if (self.priority[2].length > 0) {
                    chosen = randomReturn(self.priority[2]);
                    console.log('test4.2')
                } else {
                    chosen = randomReturn([0, 1, 2, 3, 4, 5, 6, 7, 8]);
                    console.log('test4.3')
                }
            } else {
                chosen = 4;
                console.log('test4')
            }
        } else if (self.priority[1].length > 0) {
            chosen = randomReturn(self.priority[1]);
            console.log('test5')
        } else if (self.priority[2].length > 0) {
            chosen = randomReturn(self.priority[2]);
            console.log('test6')
        } else {
            chosen = randomReturn([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            console.log('test7')
        }

        console.log('AFTER CHOSEN')
        console.log(self)
        console.log(other);
        console.log(chosen);
        return chosen;
    };

    const computer_LV1 = () => {
        let slot = null;
        while (slot === null && main_board.includes('')) {
            const ranNum = Math.floor(Math.random() * main_board.length);
            if (main_board[ranNum].length === 0) {
                slot = ranNum;
                return slot;
            };
        }
    }
    return { computer_LV1, computer_LV2 }
}

const playerFactory = (name, mark, color) => {
    let clickedGrid = [];
    let storeWin = [];


    const turnAI = (a) => {
        if (playerTurns().getName().indexOf('computer_LV') > -1 && gameBoard.getBoard().indexOf('') > -1) {
            return document.querySelectorAll('ul>li')[playerAI(a)[name]()].click();
        }
    }
    const setWin = (i) => storeWin.push(i);
    const resetCount = () => clickedGrid = [];
    const resetScore = () => clickedGrid = [];
    const winMsg = () => name + ' (' + getMark() + ') wins!';
    const startMsg = () => name + ' (' + getMark() + ') starts first';
    const turnMsg = () => name + ' (' + getMark() + ') its your turn';
    const getMark = () => mark;
    const getName = () => name;
    const getColor = () => color;
    const getCount = () => clickedGrid;
    const getWin = () => storeWin;
    return { getName, getMark, getCount, winMsg, turnMsg, startMsg, turnAI, resetCount, setWin, getWin, resetScore, getColor }
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


        for (let u = 1; u < 3; u++) {
            // Create elements and options
            const s = () => u === 1 ? 'X' : 'O';
            const playerPick = ['Human', 'computer_LV1', 'computer_LV2']
            const label = document.createElement('label');
            const input = document.createElement('input');
            const div = document.createElement('div');

            // Set class / attributes
            label.setAttribute('for', 'player' + s());
            label.innerText = s();
            input.type = 'text';
            input.placeholder = 'Enter Player ' + s() + ' Name'
            input.id = 'player' + s();
            div.classList.add('player' + s());

            // Append elements to player picking wrap
            label.appendChild(input);
            div.appendChild(label);
            domDiv.appendChild(div);

            // Player picking buttons
            for (const player of playerPick) {
                const btn = document.createElement('button');
                btn.innerText = player;
                btn.classList.add(player);
                div.appendChild(btn);

                btn.addEventListener('click', (e) => {
                    const input = e.target.parentNode.querySelector('input');
                    input.value = e.target.className;
                    e.target.parentNode.classList.remove('Human', 'computer_LV1', 'computer_LV2');
                    e.target.parentNode.classList.add(e.target.className);

                    if (e.target.innerText.indexOf('computer_LV') > -1) {
                        input.disabled = true;
                    } else {
                        input.disabled = false;
                    }
                })
            }

            u === 1 ? inputX = input : inputO = input;

        }

        // Add functionality to start button
        restartBtn.addEventListener('click', (e) => {

            if (inputX.value && inputO.value) {

                // if its restart
                if (playerX !== undefined && playerO !== undefined) {

                    if (playerX.getName() === pNames.x.getName() && playerX.getName() === pNames.x.getName()) {
                        playerX.resetCount();
                        playerO.resetCount();

                        pNames.x = Object.assign(playerX);
                        pNames.o = Object.assign(playerO);

                        // Swapping input values
                        // inputX.value = pNames.o.getName();
                        playerX = Object.assign(pNames.o);
                        // inputO.value = pNames.x.getName();
                        playerO = Object.assign(pNames.x);

                        pNames.x = Object.assign(playerX);
                        pNames.o = Object.assign(playerO);
                    }
                } else {
                    playerX = playerFactory(inputX.value, 'X', 'red');
                    playerO = playerFactory(inputO.value, 'O', 'blue');
                    pNames.x = Object.assign(playerX);
                    pNames.o = Object.assign(playerO);
                    playerX.resetCount();
                    playerO.resetCount();
                };
                // if its new
                gameBoard.resetBoard();
                subTitle.innerText = playerTurns().startMsg();
                gameBoard.boardOpenClose(true);

            } else {
                userInterface.updateMessage('Enter players X & O names!');
            }

            if (playerX !== undefined && playerO !== undefined) {
                playerTurns().turnAI(gameBoard.getBoard());
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
                    playerTurns().turnAI(gameBoard.getBoard());
                } else {
                    // userInterface.updateMessage('Click Start / Restart');
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
            }
        };

    }

    return { getData, updateBoard, gameStatus };
})();

userInterface.renderInputSection(); // Render input section
// Pre-select player types
document.querySelector('.playerX > .Human').click();
document.querySelector('.playerO > .computer_LV2').click();