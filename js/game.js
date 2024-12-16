import { MemoryGame } from './MemoryGame.js';

import { Board } from './Board.js';

document.querySelectorAll('.menu .btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const boardSize = event.currentTarget.getAttribute('data-size');
        const size = parseInt(boardSize, 10);

        if (!isNaN(size)) {
            const board = new Board(size);

            const overlay = document.querySelector('#overlay');
            const gameDiv = document.querySelector('.memory-game');
            overlay.style.visibility = 'hidden';
            gameDiv.style.opacity = '1';

            new MemoryGame(board.cards);
        } else {
            console.log("Invalid size");
        }
    });
});
