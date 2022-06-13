"use strict";

// Build board game and render function using module
// Build control function using module approach
// Build players using factory function approach

// Board game render on page
// Player given name
// When player click symbol added to clicked square
// Symbol updated on to board game array
// Game control checks to see if player won

const gameBoard = (function () {

    const _board = ['', '', '', '', '', '', '', '', ''],
        _body = document.querySelector('body'),
        _gridWrap = document.createElement('ul');
    
    test: 'this';
    when: 'that';
    
    function renderBoard() {
        for (let i = 0; i < _board.length; i++) {
            let grid = document.createElement('li');
            grid.innerText = _board[i];
            // grid.addEventListener('click', () => {
            //     console.log('grid: '+i);
            // });
            _gridWrap.appendChild(grid);
        }
        _body.appendChild(_gridWrap);
    }

    return {
        renderBoard
    };
})();

gameBoard.renderBoard(); // Render gameboard

// displayController









// const player1 = {

// }

// const player2 = {

// }
// const Person = function(name, age) {
//     this.sayHello = () => console.log('hello!');
//     this.name = name;
//     this.age = age;
//   };
  
// const jeff = new Person('jeff', 27);
  

// const personFactory = (name, age) => {
//     const sayHello = () => console.log('hello!');
//     return { name, age, sayHello };
//   };
  
//   const jeff = personFactory('jeff', 27);
  
//   console.log(jeff.name); // 'jeff'
  
//   jeff.sayHello(); // calls the function and logs 'hello!'

