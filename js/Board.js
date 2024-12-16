"use strict";

export class Board {
    constructor(size) {
        this.size = size;
        this.cards = [];
        this.imagePool = Array.from({ length: 32 }, (_, i) => `img/${i}-min.png`);
        
        this.generateBoard();
    }

    generateBoard() {
        const totalCards = this.size * this.size;
        const uniqueImagesCount = totalCards / 2;

        const selectedImages = [];
        while (selectedImages.length < uniqueImagesCount) {
            const randomIndex = Math.floor(Math.random() * this.imagePool.length);
            if (!selectedImages.includes(this.imagePool[randomIndex])) {
                selectedImages.push(this.imagePool[randomIndex]);
            }
        }

        const shuffledImages = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

        const gameBoard = document.querySelector('.memory-game');
        gameBoard.innerHTML = '';

        
        gameBoard.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;

        const fragment = document.createDocumentFragment();

        shuffledImages.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.setAttribute('data-img', image); 

            card.innerHTML = `
                <img class="front-face" src="${image}" alt="Front face" />
                <img class="back-face" src="img/q.png" alt="Back face" />
            `;
            fragment.appendChild(card);
        });

        gameBoard.appendChild(fragment);


        this.cards = document.querySelectorAll('.memory-card');
        return this.cards;
    }
}