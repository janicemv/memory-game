"use strict";

export class MemoryGame {
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
        const gameBoard = document.querySelector('.memory-game');
        gameBoard.addEventListener('click', (event) => {
            const clickedCard = event.target.closest('.memory-card');
            if (!clickedCard || clickedCard.classList.contains('flip')) return;
            this.flipCard({ currentTarget: clickedCard });
        });
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
        const isMatch = this.firstCard.getAttribute('data-img') === this.secondCard.getAttribute('data-img');

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
        if (this.foundCards === this.cards.length) {
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
