"use strict";

export class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.foundCards = 0;

        this.getFlipCard = this.flipCard.bind(this);

        this.initializeGame();
    }

    initializeGame() {
        this.cards.forEach(card => card.addEventListener('click', this.getFlipCard));
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
        this.firstCard.removeEventListener('click', this.getFlipCard);
        this.secondCard.removeEventListener('click', this.getFlipCard);
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
        }
    }

    showCompletionImage() {
        const overlay = document.querySelector('#overlay');
        const gameDiv = document.querySelector('.memory-game');

        overlay.style.visibility = 'visible';
        gameDiv.style.opacity = '0.2';
    }
}
