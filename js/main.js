// Not used anymore - replaced by the modules!

"use strict";

class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.foundCards = 0;

        this.initializeGame();
    }

    initializeGame() {
        this.cards.forEach(card => card.addEventListener('click', this.flipCard.bind(this)));
        console.log(this.cards.length);
    }

    flipCard(event) {
        const clickedCard = event.currentTarget;

        if (this.lockBoard || clickedCard === this.firstCard) return;

        clickedCard.classList.add('flip');

        if (!this.hasFlippedCard) {
            this.hasFlippedCard = true;
            this.firstCard = clickedCard;
            return;
        }

        this.secondCard = clickedCard;
        this.checkForMatch();
    }

    checkForMatch() {
        const isMatch = this.firstCard.dataset.img === this.secondCard.dataset.img;

        isMatch ? this.disableCards() : this.unflipCards();

        this.checkForCompletion();
    }

    disableCards() {
        this.firstCard.removeEventListener('click', this.flipCard.bind(this));
        this.secondCard.removeEventListener('click', this.flipCard.bind(this));
        this.foundCards = this.foundCards + 2;
        console.log(this.foundCards);
        this.resetBoard();
    }

    unflipCards() {
        this.lockBoard = true;

        setTimeout(() => {
            this.firstCard.classList.remove('flip');
            this.secondCard.classList.remove('flip');
            this.resetBoard();
        }, 900);
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    checkForCompletion() {

        if (this.cards.length === this.foundCards) {
            this.showCompletionImage();
            console.log("Done");
        }
    }

    showCompletionImage() {
        const overlay = document.querySelector('#overlay');
        const gameDiv = document.querySelector('.memory-game');

        overlay.style.visibility = 'visible';
        gameDiv.style.opacity = '0.2';

    }
}

function generateBoard(size) {
    const totalCards = size * size;
    const uniqueImagesCount = totalCards / 2;
    const imagePool = Array.from({ length: 32 }, (_, i) => `img/${i}.png`);

    const selectedImages = [];
    while (selectedImages.length < uniqueImagesCount) {
        const randomIndex = Math.floor(Math.random() * imagePool.length);
        if (!selectedImages.includes(imagePool[randomIndex])) {
            selectedImages.push(imagePool[randomIndex]);
        }
    }

    const shuffledImages = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

    const gameBoard = document.querySelector('.memory-game');
    gameBoard.innerHTML = '';

    const fragment = document.createDocumentFragment();

    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.img = image;

        card.innerHTML = `
        <img class="front-face" src="${image}" alt="Front face" />
        <img class="back-face" src="img/q.png" alt="Back face" />
    `;
        fragment.appendChild(card);
    });

    gameBoard.appendChild(fragment);

    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    return document.querySelectorAll('.memory-card');

}

document.querySelectorAll('.menu .btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const boardSize = event.currentTarget.getAttribute('data-size');
        const size = parseInt(boardSize, 10);

        if (!isNaN(size)) {
            const cards = generateBoard(size);
            const overlay = document.querySelector('#overlay');
            const gameDiv = document.querySelector('.memory-game');

            overlay.style.visibility = 'hidden';
            gameDiv.style.opacity = '1';
            new MemoryGame(cards);
        } else {
            console.log("Invalid size");
        }
    });
});

