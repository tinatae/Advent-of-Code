// transparency origami
// have list of (coordinate) dots and fold instructions
// x increases to right, y increases downward
    // e.g.  0,0  3,0

    //       0,7

// fold paper up for horizontal 'y=' lines or left for vertical 'x=' lines
// overlapping dots merge together

// part1: how many dots visible after completing first fold
// part2: finish folding transparency & return 8-letter code

const fs = require('fs')
const input = fs.readFileSync('day13.txt', 'utf8')
                .split(/\n+/)

const splitInput = input => {
  let splitIdx = -1

  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i][0] !== 'f') {
      splitIdx = i
      break
    }
  }
  return [
    input.slice(0, splitIdx + 1).map(ele => ele.split(',').map(num => parseInt(num)))
  , input.slice(splitIdx + 1).map(ele => ele.match(/(x|y)\=\d+/)[0].split('=')).map(ele => [ele[0],parseInt(ele[1])])
  ]
}

const makeKey = (x, y) => `${x}%${y}`

function foldTransparency(input) {
  let [points, instructions] = splitInput(input)

  for (let i = 0; i < instructions.length; i++) {
    let seen = new Set()
    const [axis, axisVal] = instructions[i]
    
    for (let [x, y] of points) {
      if (axis === 'y') {
        if (y < axisVal) {
          seen.add(makeKey(x, y))
        } else if (y >= axisVal) {
          const newY = 2 * axisVal - y        // === (axisVal - (y - axisVal))
          const newKey = makeKey(x, newY)
          seen.add(newKey)       
        }
      } else if (axis === 'x') {
        if (x < axisVal) {
          seen.add(makeKey(x, y))
        } else {
          const newX = 2 * axisVal - x        // === (axisVal - (x - axisVal))
          const newKey = makeKey(newX, y)
          seen.add(newKey)    
        }
      }
    }
    if (i === 0) console.log(seen.size)                                                     // part1: 666
    points = Array.from(seen).map(ele => ele.split('%').map(ele => parseInt(ele)))
  }

  return renderGrid(points)
}

function renderGrid(points) {
  let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
  points.forEach(pair => {
    xMin = Math.min(pair[0], xMin)
    xMax = Math.max(pair[0], xMax)
    yMin = Math.min(pair[1], yMin)
    yMax = Math.max(pair[1], yMax)
  })

  const grid = Array(yMax - yMin + 1).fill(0).map(row => Array(xMax - xMin + 1).fill('.'))

  for (let [x, y] of points) {
    grid[y - yMin][x - xMin] = '#'
  }

  return grid
}

console.log(foldTransparency(input))
// CJHAZHKU

// [
//   [  '.', '#', '#', '.', '.', '.', '.', '#', '#', '.', '#', '.','.', '#', '.', '.', '#', '#', '.', '.', '#', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#' ],
//   [ '#', '.', '.', '#', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '#', '.', '.', '#', '.', '.', '#' ],
//   [ '#', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#', '#', '#', '#', '.', '#', '.', '.', '#', '.', '.', '.', '#', '.', '.', '#', '#', '#', '#', '.', '#', '#', '.', '.', '.', '#', '.', '.', '#' ],
//   [ '#', '.', '.', '.', '.', '.', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '#', '#', '#', '.', '.', '#', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '#', '.', '.', '#', '.', '.', '#' ],
//   [ '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '.', '.', '#', '.', '.', '#', '.', '#', '.', '#', '.', '.', '#', '.', '.', '#' ],
//   [ '.', '#', '#', '.', '.', '.', '#', '#', '.', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '#', '#', '#', '#', '.', '#', '.', '.', '#', '.', '#', '.', '.', '#', '.', '.', '#', '#', '.' ]
// ]