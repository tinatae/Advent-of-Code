const fs = require('fs')

const input = fs.readFileSync('day4.txt', 'utf8')
                .split(/\n/)

// given input of bingo numbers and 5x5 grids representing bingo cards
// can win by matching complete row or column. no diagonals
// part1: return winner's sum of unmarked numbers on card * last bingo number called
// part2: return last winner's sum of unmarked numbers on card * last bingo number called

class Game {
  constructor(input) {
    this.numbers = input[0].split(",")
    this.boards = this.createBoards(input.slice(1))  
  }

  createBoards(array) {
    const boards = []

    let board = []

    for (let i = 0; i < array.length; i++) {   
      if (array[i] === "") {
        if (!board.length) continue;
  
        boards.push(new Board(board))
        board = []
      } else {
        const createRow = array[i].split(" ")
        board.push(createRow.length === 5 ? createRow : createRow.filter(ele => ele !== ""))      
      }
    }
    boards.push(new Board(board))
    return boards
  }

  playGame(playToWin=false) {

    let boardCount = this.boards.length

    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.boards.length; j++) {
        const board = this.boards[j]

        if (playToWin) {                                                    // try to win first
          const hasWinner = board.checkPos(this.numbers[i], playToWin)
          if (hasWinner) return hasWinner
        } else {                                                            // try to win last
          if (boardCount === 1) {
            const remainingBoard = this.removeEmptyBoards()
            const hasWinner = remainingBoard.checkPos(this.numbers[i], true)
            if (hasWinner) return hasWinner
          } else {
            if (board === '') continue
            const hasWinner = board.checkPos(this.numbers[i])
            if (hasWinner) {
              this.boards[j] = ''
              boardCount--
            }
          }
        }
      }
    }
    return false    
  }

  removeEmptyBoards() {
    return this.boards.filter(ele => !!ele)[0]
  }
}

class Board {
  constructor(board) {
    this.board = board

    this.rows = this.populateBoardSets(board)

    this.rotated = this.rotateBoard()
    this.cols = this.populateBoardSets(this.rotated)
  }

  populateBoardSets(board) {
    return board.map(row => new Set(row))
  }

  rotateBoard() {
    const rotated = []

    for (let i = 0; i < this.board[0].length; i++) {
      const col = []
      for (let j = this.board.length-1; j >= 0; j--) {
        col.push(this.board[j][i])
      }
      rotated.push(col)
    }
    return rotated
  }

  checkPos(num, playToWin=false) {
    const lastNumber = parseInt(num)

    if (playToWin) {
      if (this.checkComplete(this.rows, num)) 
        return this.multiplyLastNumAndRemainingSum(this.board, lastNumber)
      if (this.checkComplete(this.cols, num)) 
        return this.multiplyLastNumAndRemainingSum(this.rotated,lastNumber)
    } else {
      if (this.checkComplete(this.rows, num) || this.checkComplete(this.cols, num))  return true
    }
    return false
  }

  checkComplete(lineSet, num) {
    for (let i = 0; i < lineSet.length; i++) {
      const currLine = lineSet[i]

      if (currLine.has(num)) {
        currLine.delete(num)
        if (currLine.size === 0) return true
      }
    }
    return false
  }

  multiplyLastNumAndRemainingSum(board, num) {
    let sum = 0

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board === this.board && !this.rows[i].has(board[i][j])) continue
        if (board === this.rotated && !this.cols[i].has(board[i][j])) continue

        sum += parseInt(board[i][j])
      }
    }
    return sum * num
  }
}

const game = new Game(input)

console.log(game.playGame(true))
// 41503

console.log(game.playGame())
// 3178