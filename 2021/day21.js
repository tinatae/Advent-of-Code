// Dirac dice
// given single die, two pawns & circular track of 10 spaces (1 - 10 clockwise)
// each player's starting space is chosen randomly. player1 goes first

// roll die 3 times & add results. move pawn that many times around track (marked 1 - 10. wraps)
// increase score by value of space pawn stopped on
// game immediately ends as win for any player whose score reaches at least 1000

// part1: play practice round with deterministic 100-sided die. 
// (rolls 1, 2, 3, etc. up to 100 then starts over at 1 )
// when winner is determined, what is score of losing player by # times die rolled during game?

const fs = require('fs')
const input = fs.readFileSync('day21.txt', 'utf8')
                .split(/\n/)
                .map(entry => parseInt(entry[entry.length-1]))

class Game {
  constructor(input) {
    this.die = new Die()
    this.player1 = new Player(input[0])
    this.player2 = new Player(input[1])
    this.turnCount = 0
    this.losingPlayer = false
  }

  playGame() {
    while (!this.losingPlayer) {
      this.rollTurn(this.player1)
      this.turnCount++
      if (this.hasWinner()) {
        this.losingPlayer = this.player2
        break
      }

      this.rollTurn(this.player2)
      this.turnCount++
      if (this.hasWinner()) {
        this.losingPlayer = this.player1
        break
      }
    }
    return this.turnCount * 3 * this.losingPlayer.score
  }

  rollTurn(player) {
    const rolledVal = this.die.rollNumMoves()

    player.startPos = (player.startPos + rolledVal) % 10
    player.score = player.startPos === 0 ? player.score + 10 : player.score + player.startPos
  }

  hasWinner() {
    return this.player1.score >= 1000 || this.player2.score >= 1000
  }
}

class Player {
  constructor(startPos) {
    this.startPos = startPos
    this.score = 0
  }
}

class Die {
  constructor() {
    this.rollVal = 1
  }

  rollNumMoves() {
    let sum = 0

    for (let i = 0; i < 3; i++) {
      this.checkWrapVal()
      sum += this.rollVal
      this.rollVal++
    }
    return sum
  }

  checkWrapVal() {
    if (this.rollVal <= 100) return;
    this.rollVal = 1
  }
}

const game = new Game(input)
game.playGame()
// 797160

// partII: actual game is played with Dirac dice. A single three-sided quantum die
// when roll it, universe splits into multiple copies: one copy for each possible outcome of die 
// (one where outcome is 1, one where outcome is 2, 3, etc.)
// game ends when either player's score at least 21
// using starting pos, determine every possible outcome
// find player that wins in more universes. in how many universes does player win

const PossOutcome = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]

const makeKey = (pos1, score1, pos2, score2) => `${pos1}-${score1}-${pos2}-${score2}`

function countUniverses(input, memo={}) {
  return Math.max(...recursivePlay(input[0], 0, input[1], 0, memo))
}

function recursivePlay(pos1, score1, pos2, score2, memo) {
  if (score1 >= 21) return [1, 0]
  if (score2 >= 21) return [0, 1]

  const key = makeKey(pos1, score1, pos2, score2)

  if (memo[key]) return memo[key]

  let [winCount1, winCount2] = [0, 0]

  // for (const r1 of [1, 2, 3]) {
  //   for (const r2 of [1, 2, 3]) {
  //     for (const r3 of [1, 2, 3]) {
  //       const totalMoves = (pos1 + r1 + r2 + r3) % 10
  //       const nextPos = totalMoves === 0 ? 10 : totalMoves

  //       const [p2Round, p1Round] = recursivePlay(pos2, score2, nextPos, score1 + nextPos, memo)

  //       winCount1 += p1Round
  //       winCount2 += p2Round
  //     }
  //   }
  // }

  for (const [move, moveFreq] of PossOutcome) {                 // precalculated outcomes
    const totalMoves = (pos1 + move) % 10
    const nextPos = totalMoves === 0 ? 10 : totalMoves

    const [p2Round, p1Round] = recursivePlay(pos2, score2, nextPos, score1 + nextPos, memo)

    winCount1 += p1Round * moveFreq
    winCount2 += p2Round * moveFreq
  }

  return memo[key] = [winCount1, winCount2]
}

console.log(countUniverses(input))
// 27464148626406