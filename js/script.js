"use strict";

const gameBoard = (function () {

    const _board = ['', '', '', '', '', '', '', '', ''],
        _body = document.querySelector('body'),
        _gridWrap = document.createElement('ul');

    const renderBoard = () => {
        for (let i = 0; i < _board.length; i++){
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

