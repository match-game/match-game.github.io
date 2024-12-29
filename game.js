const allWordPairs = [
    ['Zig', 'Zag'],
    ['Ping', 'Pong'],
    ['Sweet', 'Sour'],
    ['Sonny', 'Cher'],
    ['Hall', 'Oates'],
    ['Sweet', 'Savory'],
    ['Salt', 'Pepper'],
    ['Fire', 'Brimstone'],
    ['Yin', 'Yang'],
    ['Ebb', 'Flow'],
    ['Ketchup', 'Mustard'],
    ['Cat', 'Dog'],
    ['Thunder', 'Lightning'],
    ['Raining', 'Pouring'],
    ['Heaven', 'Hell'],
    ['Day', 'Night'],
    ['Sugar', 'Spice'],
    ['Cream', 'Sugar'],
    ['Tea', 'Coffee'],
    ['Bacon', 'Eggs'],
    ['Macaroni', 'Cheese'],
    ['Milk', 'Cereal'],
    ['Fire', 'Ice'],
    ['Garlic', 'Onion'],
    ['Cinnamon', 'Nutmeg'],
    ['Cinnamon', 'Toast'],
    ['Cinnamon', 'Sugar'],
    ['Burger', 'Fries'],
    ['Chili', 'Cheese'],
    ['Nuts', 'Bolts'],
    ['Peppers', 'Onions'],
    ['Sunshine', 'Rainbows'],
    ['Peas', 'Carrots'],
    ['Avocado', 'Toast'],
    ['Chips', 'Dip'],
    ['Chips', 'Salsa'],
    ['Love', 'Hate'],
    ['Love', 'War'],
    ['War', 'Peace'],
    ['Light', 'Dark'],
    ['Hill', 'Dale'],
    ['River', 'Stream'],
    ['Black', 'White'],
    ['Fire', 'Water'],
    ['In', 'Out'],
    ['Up', 'Down'],
    ['Red', 'Green'],
    ['Sun', 'Moon'],
    ['Bread', 'Butter'],
    ['Peanut', 'Butter'],
    ['Thunder', 'Lightning'],
    ['Fish', 'Chips'],
    ['Love', 'Hate'],
    ['Night', 'Day'],
    ['Hot', 'Cold'],
    ['Wine', 'Cheese'],
    ['Cat', 'Dog'],
    ['Life', 'Death'],
    ['Rock', 'Roll'],
    ['Chair', 'Table'],
    ['Coffee', 'Cream'],
    ['Paper', 'Pen'],
    ['Truth', 'Lies'],
    ['Beauty', 'Beast'],
    ['Left', 'Right'],
    ['Rain', 'Shine'],
    ['Bacon', 'Eggs'],
    ['King', 'Queen'],
    ['Tic', 'Tac'],
    ['Black', 'Gold'],
    ['Happiness', 'Sorrow'],
    ['Up', 'Down'],
    ['Summer', 'Winter'],
    ['Lock', 'Key'],
    ['Paper', 'Scissors'],
    ['Wheat', 'Chaff'],
    ['Truth', 'Justice'],
    ['Peace', 'War'],
    ['Heart', 'Soul'],
    ['Salt', 'Vinegar'],
    ['Eggs', 'Bacon'],
    ['Wine', 'Dine'],
    ['Life', 'Limbs'],
    ['High', 'Low'],
    ['Head', 'Shoulders'],
    ['Coke', 'Pepsi'],
    ['Cause', 'Effect'],
    ['Boys', 'Girls'],
    ['War', 'Peace'],
    ['Stars', 'Stripes'],
    ['Man', 'Woman'],
    ['Pen', 'Paper'],
    ['Hammer', 'Nail'],
    ['Candle', 'Light'],
    ['Bread', 'Jam'],
    ['Salt', 'Sugar'],
    ['Thunder', 'Storm'],
    ['Moon', 'Stars'],
    ['Good', 'Evil'],
    ['Speed', 'Power'],
    ['Love', 'Affection'],
    ['Mind', 'Body'],
    ['Sunrise', 'Sunset'],
    ['Storm', 'Calm'],
    ['North', 'South'],
    ['East', 'West'],
    ['Beauty', 'Grace'],
    ['Pencil', 'Eraser'],
    ['Key', 'Lock'],
    ['Sword', 'Shield'],
    ['Rain', 'Rainbow'],
    ['Milk', 'Cookies'],
    ['Tea', 'Biscuits'],
    ['Chalk', 'Cheese'],
    ['Pen', 'Ink'],
    ['Sugar', 'Cream'],
    ['Red', 'Blue'],
    ['Old', 'New'],
    ['Young', 'Old'],
    ['Fast', 'Slow'],
    ['Big', 'Small'],
    ['Rich', 'Poor'],
    ['Happy', 'Sad'],
    ['Truth', 'Wisdom'],
    ['Laugh', 'Cry'],
    ['Fire', 'Spark'],
    ['Clouds', 'Sky'],
    ['Snow', 'Ice'],
    ['King', 'Knight'],
    ['Princess', 'Prince'],
    ['Mother', 'Father'],
    ['Brother', 'Sister'],
    ['King', 'Kingdom'],
    ['Master', 'Servant'],
    ['Light', 'Dark'],
    ['Rock', 'Mountain'],
    ['Ocean', 'Shore'],
    ['Forest', 'Trees'],
    ['Birds', 'Bees'],
    ['Storm', 'Thunder'],
    ['Apple', 'Pear']
];

const wordPairs = shuffle(allWordPairs).slice(0, 7);

let selectedLeft = null;
let selectedRight = null;
let matchedPairs = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGame() {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    
    const shuffledPairs = shuffle([...wordPairs]);
    const shuffledRight = shuffle([...shuffledPairs]);

    shuffledPairs.forEach((pair, index) => {
        const leftCard = createCard(pair[0], 'left', index);
        const rightCard = createCard(shuffledRight[index][1], 'right', index);
        
        leftColumn.appendChild(leftCard);
        rightColumn.appendChild(rightCard);
    });
}

function createCard(word, side, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = word;
    card.dataset.index = index;
    card.dataset.word = word;
    
    if (side === 'left') {
        card.style.backgroundColor = '#d4e9d7';
    } else {
        card.style.backgroundColor = '#c1e1c5';
    }
    
    card.addEventListener('click', () => handleCardClick(card, side));
    return card;
}

function handleCardClick(card, side) {
    if (card.classList.contains('matched')) return;

    if (side === 'left') {
        if (selectedLeft) {
            selectedLeft.classList.remove('selected');
            selectedLeft.style.backgroundColor = '#d4e9d7';
        }
        selectedLeft = card;
    } else {
        if (selectedRight) {
            selectedRight.classList.remove('selected');
            selectedRight.style.backgroundColor = '#c1e1c5';
        }
        selectedRight = card;
    }

    card.classList.add('selected');
    card.style.backgroundColor = '#a8d8ae';

    checkMatch();
}

function checkMatch() {
    if (!selectedLeft || !selectedRight) return;

    // const leftIndex = wordPairs.findIndex(pair => 
    //     pair[0] === selectedLeft.dataset.word);

    const candidates = wordPairs.filter(pair => pair[0] === selectedLeft.dataset.word);
    const rightIndex = candidates.findIndex(pair => pair[1] === selectedRight.dataset.word);
    
    if (rightIndex !== -1) {
        matchedPairs.push([selectedLeft.dataset.word, selectedRight.dataset.word]);
        selectedLeft.classList.add('matched');
        selectedRight.classList.add('matched');
        
        const leftCard = selectedLeft;
        const rightCard = selectedRight;
        
        setTimeout(() => {
            leftCard.style.visibility = 'hidden';
            rightCard.style.visibility = 'hidden';
        }, 1000);

        if (matchedPairs.length === wordPairs.length) {
            setTimeout(showWinScreen, 1500);
        }
    } else {
        const leftCard = selectedLeft;
        const rightCard = selectedRight;
        
        leftCard.classList.add('mismatched');
        rightCard.classList.add('mismatched');
        
        setTimeout(() => {
            leftCard.classList.remove('mismatched');
            rightCard.classList.remove('mismatched');
            leftCard.style.backgroundColor = '#d4e9d7';
            rightCard.style.backgroundColor = '#c1e1c5';
        }, 1000);
    }

    selectedLeft.classList.remove('selected');
    selectedRight.classList.remove('selected');
    selectedLeft = null;
    selectedRight = null;
}

function showWinScreen() {
    const winScreen = document.getElementById('win-screen');
    const matchesList = document.getElementById('matches-list');
    
    matchesList.innerHTML = matchedPairs
        .map(pair => `<div><span class="pair-left">${pair[0]}</span> ↔ <span class="pair-right">${pair[1]}</span></div>`)
        .join('');
    
    winScreen.style.display = 'flex';
    winScreen.style.opacity = '0';
    winScreen.style.backgroundColor = 'rgba(212, 233, 215, 0.95)';
    requestAnimationFrame(() => {
        winScreen.style.transition = 'opacity 0.5s ease';
        winScreen.style.opacity = '1';
    });
}

createGame();