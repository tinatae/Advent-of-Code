// syntax error in navigation subsystem
// '(' should close ')', '[' should close ']', '{' should close '}', '<' should close '>
// some lines incomplete, some are corrupted (chunk closes with wrong character). whole line then considered corrupted

// part1:
// for corrupted (do not do this for incomplete sequences) stop at first incorrect closing char and sum incorrect char
// ')': 3 points, ']': 57 points, '}': 1197 points, '>': 25137 points

// part2:
// discard corrupted and complete incomplete sequences
// for each added char, (start total score at 0 for each sequence) multiply total score by 5 and increase total by point values
// ')': 1 points, ']': 2 points, '}': 3 points, '>': 4 points
// sort all scores and return middle

const fs = require('fs')
const input = fs.readFileSync('day10.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split(''))

const Pairs = { ')':'(', ']':'[', '}':'{', '>':'<' }
const SyntaxPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 }

function sumIncorrectSyntax(input) {
  let stack = []
  let sum = 0

  for (let i = 0; i < input.length; i++) {
    let fillEmpty = false
    for (let j = 0; j < input[i].length; j++) {

      if (fillEmpty) {
        input[i][j] = ''
        continue
      }

      const char = input[i][j]

      if (Pairs[char]) {
        if (stack[stack.length-1] === Pairs[char]) {
          stack.pop()
        } else {
          sum += SyntaxPoints[char]
          fillEmpty = true
        } 
      } else {
        stack.push(char)
      }
    }
  }
  const incompletes = input.filter(line => line[line.length-1] !== '')
  return completeIncompletes(incompletes)

  // return sum                                 // part1: 343863
}

const AutoCompletePoints = { '(': 1, '[': 2, '{': 3, '<': 4 }

function completeIncompletes(input) {
  let stack = []
  let sums = []

  for (const line of input) {
    let sum = 0
    for (const char of line) {
      if (Pairs[char] && stack[stack.length-1] === Pairs[char]) {
        stack.pop()  
      } else {
        stack.push(char)
      }
    }

    while (stack.length) {
      sum *= 5
      sum += AutoCompletePoints[stack.pop()]
    }
    sums.push(sum)
  }
  
  sums.sort((a, b) => a - b)
  return sums[Math.floor(sums.length/2)]
}

console.log(sumIncorrectSyntax(input)) 
// part2: 2924734236