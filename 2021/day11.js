// have bioluminescent dumbo octopuses!
// they do not like the lights on your submarine lol

// have 100 octopuses with (0 - 9 energy level) in 10 by 10 grid.
// at each step, each octopus energy level += 1
// octopus flashes brightly for a moment when energy is full (= 9)
// and flash increases adjacent (includes diagonal) octopus energy level by 1

// each octopus can only flash once per step and energy level set back to 0 after

// pt1: how many total flashes after 100 steps
// pt2: flashes are sychronizing. what is first step where all octopuses flash at same time

const fs = require('fs')
const input = fs.readFileSync('day11.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split('').map(ele => parseInt(ele)))

const Dir = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]]

const makeKey = (x, y) => `${x}-${y}`

function bigFlash(input) {
  let steps = 0
  let hundredStepCount = 0
  
  while (!allZeros(input)) {
    let flashPos = []

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        input[i][j]++

        if (input[i][j] > 9) {
          flashPos.push([i, j])
        }
      }
    }

    // check flash points
    let seen = new Set()

    const dfs = posArr => {
      const queue = [...posArr]

      while (queue.length) {
        const [x, y] = queue.pop()
        const posKey = makeKey(x, y)
           
        if (!seen.has(posKey)) {
          seen.add(posKey)

          input[x][y] = 0
          hundredStepCount++

          Dir.forEach(neighbor => {
            const nx = neighbor[0] + x, ny = neighbor[1] + y
            const neighborKey = makeKey(nx, ny)

            if (nx >= 0 && nx < input.length && ny >= 0 && ny < input[0].length) {
              if (!seen.has(neighborKey)) {
                input[nx][ny]++

                if (input[nx][ny] > 9) queue.push([nx, ny])                
              }      
            }
          })
        }
      }
    }

    dfs(flashPos)

    steps++
    if (steps === 100) console.log(hundredStepCount)                // part1: 1755

    flashPos = []
    seen = new Set()
  }
  return steps
}

function allZeros(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] !== 0) return false
    }
  }
  return true
}

// part2
console.log(bigFlash(input))
// 212
