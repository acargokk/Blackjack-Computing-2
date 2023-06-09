import * as blackjack from "./Blackjack.js";


// Initial bank balance
var balance = 100;

// Function for disabling a button by its ID
function disableButton(id){
    document.getElementById(id).style.pointerEvents="none";
    document.getElementById(id).style.cursor="default";
    document.getElementById(id).style.opacity=0.2;
}

// Function for enabling a button by its ID
function enableButton(id){
    document.getElementById(id).style.pointerEvents="auto";
    document.getElementById(id).style.cursor="pointer";
    document.getElementById(id).style.opacity=1;
}

// Defining variables and buttons
var bet = 10;
var dealerPlayed = false;
var playerTotal = null;
var playerCard1 = null;
var playerCard2 = null;
var playerCard3 = null;
var playerCard4 = null;
var playerCard5 = null;
var dealerUpcard = null;
var dealerTotal = null;
var allCardsHit = false;
var dealerCardCount = 2;
var doubled = false;
const controller = new AbortController();
const {signal} = controller;
const hitbutton = document.getElementById("hitbutton");
const standbutton = document.getElementById("standbutton");
const doublebutton = document.getElementById("doublebutton");

// Disabling gameplay buttons
disableButton("hitbutton");
disableButton("standbutton");
disableButton("doublebutton");



// Functions to turn card images on or off
function cardOff(cardID){
    document.getElementById(cardID).setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
}

function cardOn(cardID){
    document.getElementById(cardID).setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");
}

function allCardsOff(){
    cardOff("playerCard1");
    cardOff("playerCard2");
    cardOff("playerCard3");
    cardOff("playerCard4");
    cardOff("playerCard5");
    cardOff("dealerCard1");
    cardOff("dealerCard2");
    cardOff("dealerCard3");
    cardOff("dealerCard4");
    cardOff("dealerCard5");
    cardOff("dealerCard6");
}

// Turning on the first four cards
allCardsOff();
cardOn("playerCard1")
cardOn("playerCard2")
cardOn("dealerCard1")
cardOn("dealerCard2")
// Turning off labels for dealer and player total values
document.getElementById("dealerText").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
document.getElementById("playerText").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");

// Gameplay functions
// Dealer plays
function dealerPlay(){
    var dealerCard2 = blackjack.draw();
    dealerTotal = blackjack.deck[dealerUpcard] + blackjack.deck[dealerCard2];
    var dealerAllCards = " "
    var dealerNewCard = null;
    console.log("Dealers other card was " + blackjack.cardName(dealerCard2))
    //display
    cardOn("dealerCard2");
    document.getElementById("dealerCard2").src = blackjack.image[dealerCard2];
    while (dealerTotal < 17) {
        dealerNewCard = blackjack.draw();
        dealerAllCards += blackjack.cardName(dealerNewCard) + ", "
        dealerTotal += blackjack.deck[dealerNewCard];
        dealerCardCount++;
        setTimeout(() => {  cardOn("dealerCard" + String(dealerCardCount)); }, 700);
        document.getElementById("dealerCard" + String(dealerCardCount)).src = blackjack.image[dealerNewCard];
    }
    if(dealerNewCard != null){
        console.log("Dealer draws" + dealerAllCards)
    }
    console.log("Dealer stands")
    console.log("Dealer total is " + dealerTotal)
    document.getElementById("dealerTotal").innerHTML = dealerTotal
    document.getElementById("dealerTotal").setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");

    dealerPlayed = true;
    if(dealerPlayed === true){
        if(dealerTotal > 21){
            balance = blackjack.playerWon(balance, bet);
            console.log("Dealer busts, player wins £" + bet);
            document.getElementById("alert").innerHTML = "Dealer busts, player wins £" + bet;
        } else if(dealerTotal === playerTotal){
            console.log("Push! Player gets original bet back");
            document.getElementById("alert").innerHTML = "Push! Player gets original bet back";
            //nothing happens
        } else if(dealerTotal < playerTotal){
            balance = blackjack.playerWon(balance, bet);
            console.log("Player wins £" + bet);
            document.getElementById("alert").innerHTML = "Player wins £" + bet;
        } else {
            console.log("Dealer wins");
            document.getElementById("alert").innerHTML = "Dealer wins";
            balance = blackjack.playerLost(balance, bet);
        }
        document.getElementById("balance").innerHTML = "Balance: £" + balance;
    }
    enableButton("play");
}
// Player doubles
function double(){
    //Player doubles down on first card
    bet = bet*2;
    doubled = true;
    disableButton("hitbutton");
    disableButton("standbutton");
    disableButton("doublebutton");
    playerCard3 = blackjack.draw();
    console.log("Player doubles down, the new card is " + blackjack.cardName(playerCard3));
    playerTotal = blackjack.deck[playerCard1] + blackjack.deck[playerCard2] + blackjack.deck[playerCard3];
    //display
    cardOn("playerCard3");
    document.getElementById("playerCard3").src = blackjack.image[playerCard3];
    document.getElementById("playerCard3").setAttribute("style","transform: rotate(90deg); margin-left: -70px;");
    //soft value calculation module
    if(playerTotal >= 22){
        if(blackjack.deck[playerCard1] === 11){
            playerTotal = playerTotal - 10;
        }
        if(playerTotal >= 22){
            if(blackjack.deck[playerCard2] === 11){
                playerTotal = playerTotal - 10;
            }
            if(playerTotal >= 22){
                if(blackjack.deck[playerCard3] === 11){
                    playerTotal = playerTotal - 10;
                }
            }
        }
    }
    document.getElementById("playerTotal").innerHTML = playerTotal;
    if(playerTotal <= 21){
        //Player Turn Ends, Dealer Starts
        console.log("The final value is " + playerTotal);
        dealerPlay();
    } else {
        //Player bust
        document.getElementById("balance").innerHTML = "Balance: £" + balance;
        enableButton("play");
        console.log("The final value is " + playerTotal + ", player busts");
        document.getElementById("alert").innerHTML = "The final value is " + playerTotal + ", player busts";
        balance = blackjack.playerLost(balance, bet)
        //return;
    }
}
// Player stands
function stand(){
    //Player stands
    console.log("Player stands");
    disableButton("hitbutton");
    disableButton("standbutton");
    disableButton("doublebutton");
    //Player Turn Ends, Dealer Starts
    dealerPlay();
}
// Player hits
function hit3(){
    //Player hits third card
    allCardsHit = true;
    disableButton("hitbutton");
    disableButton("standbutton");
    disableButton("doublebutton");
    playerTotal = blackjack.deck[playerCard1] + blackjack.deck[playerCard2] + blackjack.deck[playerCard3] + blackjack.deck[playerCard4] + blackjack.deck[playerCard5];
    console.log("Player hits, the new card is " + blackjack.cardName(playerCard5));
    //display
    cardOn("playerCard5");
    document.getElementById("playerCard5").src = blackjack.image[playerCard5];
    //soft value calculation module
    if(playerTotal >= 22){
        if(blackjack.deck[playerCard1] === 11){
            playerTotal = playerTotal - 10;
        }
        if(playerTotal >= 22){
            if(blackjack.deck[playerCard2] === 11){
            playerTotal = playerTotal - 10;
            }
            if(playerTotal >= 22){
                if(blackjack.deck[playerCard3] === 11){
                    playerTotal = playerTotal - 10;
                }
                if(playerTotal >= 22){
                    if(blackjack.deck[playerCard4] === 11){
                        playerTotal = playerTotal - 10;
                    }
                    if(playerTotal >= 22){
                        if(blackjack.deck[playerCard5] === 11){
                            playerTotal = playerTotal - 10;
                        }
                    }
                }
            }
        }
    }
    document.getElementById("playerTotal").innerHTML = playerTotal;
    if (playerTotal <= 21 && allCardsHit === true){
        console.log("5-Card Charlie - player wins £" + bet);
        document.getElementById("alert").innerHTML = "5-Card Charlie - player wins £" + bet;
        balance = blackjack.playerWon(balance, bet);
        document.getElementById("balance").innerHTML = "Balance: £" + balance;
        enableButton("play");
    } else {
        //Player busts
        console.log("The new total is " + playerTotal + ", player busts");
        document.getElementById("alert").innerHTML = "The new total is " + playerTotal + ", player busts"
        enableButton("play");
        balance = blackjack.playerLost(balance, bet);
    }
}
function hit2(){
    //Player hits second card
    allCardsHit = false;
    disableButton("hitbutton");
    disableButton("standbutton");
    disableButton("doublebutton");
    playerTotal = blackjack.deck[playerCard1] + blackjack.deck[playerCard2] + blackjack.deck[playerCard3] + blackjack.deck[playerCard4];
    console.log("Player hits, the new card is " + blackjack.cardName(playerCard4));
    //display
    cardOn("playerCard4");
    document.getElementById("playerCard4").src = blackjack.image[playerCard4];
    //soft value calculation module
    if(playerTotal >= 22){
        if(blackjack.deck[playerCard1] === 11){
            playerTotal = playerTotal - 10;
        }
        if(playerTotal >= 22){
            if(blackjack.deck[playerCard2] === 11){
            playerTotal = playerTotal - 10;
            }
            if(playerTotal >= 22){
                if(blackjack.deck[playerCard3] === 11){
                    playerTotal = playerTotal - 10;
                }
                if(playerTotal >= 22){
                    if(blackjack.deck[playerCard4] === 11){
                        playerTotal = playerTotal - 10;
                    }
                }
            }
        }
    }
    document.getElementById("playerTotal").innerHTML = playerTotal;
    if(playerTotal < 21){
        enableButton("hitbutton");
        enableButton("standbutton");
        console.log("The new total is " + playerTotal);
        hitbutton.addEventListener("click", hit3, { once: true }, {signal});
    } else if(playerTotal === 21){
        //Player Turn Ends, Dealer Starts
        console.log("The new total is " + playerTotal);
         dealerPlay();
     } else {
         //Player Busts
         console.log("The new total is " + playerTotal + ", player busts");
         document.getElementById("alert").innerHTML = "The new total is " + playerTotal + ", player busts";
         enableButton("play");
         balance = blackjack.playerLost(balance, bet);
     }
}
function hit1(){
                //Player hits first card
                allCardsHit = false;
                disableButton("hitbutton");
                disableButton("standbutton");
                disableButton("doublebutton");
                playerTotal = blackjack.deck[playerCard1] + blackjack.deck[playerCard2] + blackjack.deck[playerCard3];
                //display
                cardOn("playerCard3");
                document.getElementById("playerCard3").src = blackjack.image[playerCard3];
                //soft value calculation module
                if(playerTotal >= 22){
                    if(blackjack.deck[playerCard1] === 11){
                        playerTotal = playerTotal - 10;
                    }
                    if(playerTotal >= 22){
                        if(blackjack.deck[playerCard2] === 11){
                            playerTotal = playerTotal - 10;
                        }
                        if(playerTotal >= 22){
                            if(blackjack.deck[playerCard3] === 11){
                                playerTotal = playerTotal - 10;
                            }
                        }
                    }
                }
                document.getElementById("playerTotal").innerHTML = playerTotal;
                console.log("Player hits, the new card is " + blackjack.cardName(playerCard3));
                if(playerTotal < 21){
                    enableButton("hitbutton");
                    enableButton("standbutton");
                    console.log("The new total is " + playerTotal);
                    hitbutton.addEventListener("click", hit2, { once: true }, {signal});
                } else if(playerTotal === 21){
                    //Player Turn Ends, Dealer Starts
                    console.log("The new total is " + playerTotal);
                    dealerPlay();
                } else {
                    //Player Busts
                    console.log("The new total is " + playerTotal + ", player busts");
                    document.getElementById("alert").innerHTML = "The new total is " + playerTotal + ", player busts";
                    enableButton("play");
                    balance = blackjack.playerLost(balance, bet)
                }
}

// Main game function
function playBlackjack(){
    disableButton("play");
    bet = parseInt(prompt("Place your bet:", bet));
    console.log("Current balance is £" + balance);

    doublebutton.removeEventListener("click", double);
    standbutton.removeEventListener("click", stand);
    hitbutton.removeEventListener("click", hit1);
    hitbutton.removeEventListener("click", hit2);
    hitbutton.removeEventListener("click", hit3);
    document.getElementById("alert").innerHTML = " ";

    //Player hits
    hitbutton.addEventListener("click", hit1, {once:true});
    //Player stands
    standbutton.addEventListener("click", stand, {once:true});
    //Player doubles
    doublebutton.addEventListener("click", double, {once:true});

    doubled = false;
    dealerPlayed = false;
    dealerCardCount = 2;
    if(!(0 < Number(bet) && Number(bet) <= balance)){
        alert("Invalid bet");
        enableButton("play");
        return;
    }
    console.log("Player bets £" + bet + ", game starts");
    document.getElementById("balance").innerHTML = "Balance: £" + balance;
    //Draw cards
    disableButton("hitbutton");
    disableButton("standbutton");
    disableButton("doublebutton");
    playerCard1 = blackjack.draw();
    playerCard2 = blackjack.draw();
    playerCard3 = blackjack.draw();
    playerCard4 = blackjack.draw();
    playerCard5 = blackjack.draw();
    dealerUpcard = blackjack.draw();
    allCardsHit = false;

    //Display cards
    allCardsOff();
    document.getElementById("dealerText").setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");
    document.getElementById("dealerTotal").setAttribute("style","opacity:0; -moz-opacity:0; filter:alpha(opacity=0)");
    document.getElementById("playerText").setAttribute("style","opacity:1; -moz-opacity:1; filter:alpha(opacity=100)");
    cardOn("playerCard1");
    document.getElementById("playerCard1").src = blackjack.image[playerCard1];
    cardOn("playerCard2");
    document.getElementById("playerCard2").src = blackjack.image[playerCard2];
    cardOn("dealerCard1");
    document.getElementById("dealerCard1").src = blackjack.image[dealerUpcard];
    cardOn("dealerCard2");
    document.getElementById("dealerCard2").src = "./assets/Playing Cards/red.png";

    playerTotal = blackjack.deck[playerCard1] + blackjack.deck[playerCard2];
    if(playerTotal === 22){
        playerTotal = playerTotal - 10;
    }
    document.getElementById("playerTotal").innerHTML = playerTotal;
    console.log("Players inital cards are " + blackjack.cardName(playerCard1) + " and " + blackjack.cardName(playerCard2));
    console.log("Total value of players cards are " + playerTotal);
    console.log("Dealers upcard is " + blackjack.cardName(dealerUpcard));
    if(playerTotal === 21){
        //Blackjack

        console.log("Blackjack! Player wins £" + 1.5*bet);
        document.getElementById("alert").innerHTML = "Blackjack! Player wins £" + 1.5*bet;
        balance = blackjack.playerBlackjack(balance, bet);
        document.getElementById("balance").innerHTML = "Balance: £" + balance;
        enableButton("play");
    } else {
        enableButton("hitbutton");
        enableButton("standbutton");
        if(Number(bet)*2 <= balance){
            enableButton("doublebutton");
        }

    }
};

// Assigning main function to the play button
const play = document.getElementById("play");
play.addEventListener("click", playBlackjack);
