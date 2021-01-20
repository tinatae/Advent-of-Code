const fs = require('fs')

const input = fs.readFileSync('22.txt', 'utf8').split(/\n/)

// Game consists of a series of rounds: both players draw their top card, & the player with the 
// higher-valued card wins the round. The winner keeps both cards, placing them on the bottom of their own deck 
// so that the winner's card is above the other card. If this causes a player to have all of the cards, they win, and the game ends.

// Once the game ends, you can calculate the winning player's score. The bottom card in their deck is 
// worth the value of the card multiplied by 1, the second-from-the-bottom card is worth the value 
// of the card multiplied by 2, and so on. 

// PART ONE: What is the winning player's score?

function crabCards(input) {
  let player1 = input.slice(1, input.indexOf("")).map(ele => parseInt(ele))
  let player2 = input.slice(input.indexOf("")+2).map(ele => parseInt(ele))

  while (player1.length !== 0 && player2.length !== 0) {
    let card1 = player1.shift()
    let card2 = player2.shift()

    if (card1 > card2) {
      player1.push(card1, card2)
    } else {
      player2.push(card2, card1)
    }
  }

  const winner = player1.concat(player2)

  let sum = 0

  for (let i = 1; i <= winner.length; i++) {
    sum += winner[winner.length-i]*i
  }

  return sum                                // PART ONE: 33925
}

console.log(crabCards(input))

// Same game but before either player deals a card, if there was a previous round in this game that had exactly 
// same cards in the same order in the same players' decks, the game instantly ends in a win for player 1. 
// Previous rounds from other games are not considered.

// Players begin the round by each drawing the top card of their deck as normal. If both players have at least 
// as many cards remaining in their deck as the value of the card they just drew, the winner of the round is determined 
// by playing a new game of Recursive Combat (see below).
// Otherwise, at least one player must not have enough cards left in their deck to recurse; 
// the winner of the round is the player with the higher-value card.

// As in regular Combat, the winner of the round (even if they won the round by winning a sub-game) 
// takes the two cards dealt at the beginning of the round and places them on the bottom of their own deck 
// (again so that the winner's card is above the other card). Note: the winner's card might be the lower-valued 
// of the two cards if they won the round due to winning a sub-game. If collecting cards by winning the round 
// causes a player to have all of the cards, they win, and the game ends.

// During a round of Recursive Combat, if both players have at least as many cards in their own decks as the number 
// on the card they just dealt, the winner of the round is determined by recursing into a sub-game of Recursive Combat. 

// To play a sub-game of Recursive Combat, each player creates a new deck by making a copy of the next cards in their deck 
// (the quantity of cards copied is equal to the number on the card they drew to trigger the sub-game). During this sub-game, 
// the game that triggered it is on hold and completely unaffected; no cards are removed from players' decks to form the sub-game. 
// (For example, if player 1 drew the 3 card, their deck in the sub-game would be copies of the next three cards in their deck.)

// After the game, the winning player's score is calculated from the cards they have in their original deck using the same rules as above

// PART 2: What is the winning player's score?

function playGame(input) {
  let player1 = input.slice(1, input.indexOf("")).map(ele => parseInt(ele))
  let player2 = input.slice(input.indexOf("")+2).map(ele => parseInt(ele))

  let winningDeck = recCrabCards(player1, player2)[1]

  return sumEverything(winningDeck)
}

function recCrabCards(player1, player2, seen = new Set()) {

  while (player1.length > 0 && player2.length > 0) {
    const deck = `${player1}-${player2}`

    if (seen.has(deck)) {
      return [1, player1]
    }
    seen.add(deck)
  
    let card1 = player1.shift()
    let card2 = player2.shift()

    let winner;

    if (card1 <= player1.length && card2 <= player2.length) {
      let copy1 = player1.slice(0, card1)
      let copy2 = player2.slice(0, card2)

      winner = recCrabCards(copy1, copy2)[0];
    } else {
      winner = card1 > card2 ? (1) : (2);
    }

    if (winner == 1) {
      player1 = player1.concat([card1, card2])
    } else {
      player2 = player2.concat([card2, card1])
    }
  }

  let winnerName = player1.length > 0 ? 1 : 2
  let winnerCards = player1.length > 0 ? player1 : player2
  return [winnerName, winnerCards]
}

function sumEverything(deck) {
  let sum = 0
  for (let i = 1; i <= deck.length; i++) {
    sum += deck[deck.length-i]*i
  }
  return sum                                    // PART TWO: 33441
}

console.log(playGame(input))
