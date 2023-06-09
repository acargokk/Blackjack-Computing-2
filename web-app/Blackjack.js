
// object defining the deck of cards and their respective values
export var deck = {
    "as": 11, "2s": 2, "3s": 3, "4s": 4, "5s": 5, "6s": 6, "7s": 7, "8s": 8, "9s": 9, "0s": 10, "js": 10, "qs": 10, "ks": 10,
    "ah": 11, "2h": 2, "3h": 3, "4h": 4, "5h": 5, "6h": 6, "7h": 7, "8h": 8, "9h": 9, "0h": 10, "jh": 10, "qh": 10, "kh": 10,
    "ac": 11, "2c": 2, "3c": 3, "4c": 4, "5c": 5, "6c": 6, "7c": 7, "8c": 8, "9c": 9, "0c": 10, "jc": 10, "qc": 10, "kc": 10,
    "ad": 11, "2d": 2, "3d": 3, "4d": 4, "5d": 5, "6d": 6, "7d": 7, "8d": 8, "9d": 9, "0d": 10, "jd": 10, "qd": 10, "kd": 10
    };

// Object to help convert to full length card name
var cardToName = {
    "s": "of Spades",
    "h": "of Hearts",
    "c": "of Clubs",
    "d": "of Diamonds",
    "a": "Ace",
    "j": "Jack",
    "q": "Queen",
    "k": "King",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "0": "Ten"
};

// Function for converting to full length card name
export function cardName(card){
    var suit = card.charAt(1);
    var face = card.charAt(0);
    return cardToName[face] + " " + cardToName[suit];
}

// Function that draws a random card from the deck.
// Returns the key of the card
export function draw(){
    var cards = Object.keys(deck);
    var drawnCard = cards[Math.floor(Math.random() * cards.length)];
    return drawnCard;
}

//object for converting cards to images
export var image = {
    "as": "./assets/Playing Cards/spades_ace_simple.png",
    "2s": "./assets/Playing Cards/spades_2.png",
    "3s": "./assets/Playing Cards/spades_3.png",
    "4s": "./assets/Playing Cards/spades_4.png",
    "5s": "./assets/Playing Cards/spades_5.png",
    "6s": "./assets/Playing Cards/spades_6.png",
    "7s": "./assets/Playing Cards/spades_7.png",
    "8s": "./assets/Playing Cards/spades_8.png",
    "9s": "./assets/Playing Cards/spades_9.png",
    "0s": "./assets/Playing Cards/spades_10.png",
    "js": "./assets/Playing Cards/spades_jack.png",
    "qs": "./assets/Playing Cards/spades_queen.png",
    "ks": "./assets/Playing Cards/spades_king.png",
    "ah": "./assets/Playing Cards/hearts_ace.png",
    "2h": "./assets/Playing Cards/hearts_2.png",
    "3h": "./assets/Playing Cards/hearts_3.png",
    "4h": "./assets/Playing Cards/hearts_4.png",
    "5h": "./assets/Playing Cards/hearts_5.png",
    "6h": "./assets/Playing Cards/hearts_6.png",
    "7h": "./assets/Playing Cards/hearts_7.png",
    "8h": "./assets/Playing Cards/hearts_8.png",
    "9h": "./assets/Playing Cards/hearts_9.png",
    "0h": "./assets/Playing Cards/hearts_10.png",
    "jh": "./assets/Playing Cards/hearts_jack.png",
    "qh": "./assets/Playing Cards/hearts_queen.png",
    "kh": "./assets/Playing Cards/hearts_king.png",
    "ac": "./assets/Playing Cards/clubs_ace.png",
    "2c": "./assets/Playing Cards/clubs_2.png",
    "3c": "./assets/Playing Cards/clubs_3.png",
    "4c": "./assets/Playing Cards/clubs_4.png",
    "5c": "./assets/Playing Cards/clubs_5.png",
    "6c": "./assets/Playing Cards/clubs_6.png",
    "7c": "./assets/Playing Cards/clubs_7.png",
    "8c": "./assets/Playing Cards/clubs_8.png",
    "9c": "./assets/Playing Cards/clubs_9.png",
    "0c": "./assets/Playing Cards/clubs_10.png",
    "jc": "./assets/Playing Cards/clubs_jack.png",
    "qc": "./assets/Playing Cards/clubs_queen.png",
    "kc": "./assets/Playing Cards/clubs_king.png",
    "ad": "./assets/Playing Cards/diamonds_ace.png",
    "2d": "./assets/Playing Cards/diamonds_2.png",
    "3d": "./assets/Playing Cards/diamonds_3.png",
    "4d": "./assets/Playing Cards/diamonds_4.png",
    "5d": "./assets/Playing Cards/diamonds_5.png",
    "6d": "./assets/Playing Cards/diamonds_6.svg",
    "7d": "./assets/Playing Cards/diamonds_7.png",
    "8d": "./assets/Playing Cards/diamonds_8.png",
    "9d": "./assets/Playing Cards/diamonds_9.png",
    "0d": "./assets/Playing Cards/diamonds_10.png",
    "jd": "./assets/Playing Cards/diamonds_jack.png",
    "qd": "./assets/Playing Cards/diamonds_queen.png",
    "kd": "./assets/Playing Cards/diamonds_king.png"
};

function updateBalance(balance){
    document.getElementById("balance").innerHTML = "Balance: £" + balance;
}

//game state conditions
export function playerWon(balance, bet){
    balance = String(Number(balance) + Number(bet));
    updateBalance(balance);
    return balance;
}
export function playerBlackjack(balance, bet){
    balance = String(Number(balance) + 1.5*Number(bet));
    updateBalance(balance);
    return balance;
}
export function playerLost(balance, bet){
    balance = String(Number(balance) - Number(bet));
    updateBalance(balance);
    return balance;
}

