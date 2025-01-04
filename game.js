const emojis = ['🍕', '🍔', '🍟', '🥞', '🥪', '🍺', '🍜', '🍨', '🍕', '🍔', '🍟', '🥞', '🥪', '🍺', '🍜', '🍨'];
let flippedCards = [];
let matchedCards = [];
let canFlip = true;

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = '❓';
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }
    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkForMatch();
    }
}

function checkForMatch() {
    setTimeout(() => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedCards.push(card1, card2);
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            if (matchedCards.length === emojis.length) {
                showWinModal();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '❓';
            card2.textContent = '❓';
        }
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function showWinModal() {
    const modal = document.getElementById('winModal');
    modal.style.display = 'flex';
    modal.classList.add('show'); 

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        resetGame();
    });
}

function resetGame() {
    const gameBoard = document.querySelector('.gameBoard');
    gameBoard.innerHTML = ''; // Clear the board
    flippedCards = [];
    matchedCards = [];
    canFlip = true;
    startGame(); // Restart the game
}

function startGame() {
    const gameBoard = document.querySelector('.gameBoard');
    emojis.sort(() => Math.random() - 0.5);
    emojis.forEach(emoji => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });
}

startGame();
