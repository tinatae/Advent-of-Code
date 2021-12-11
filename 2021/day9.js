// given heightmap of lava tube cave
// smoke flows to low points where point is lower than 4 adjacent points
// (height ranges: 0 - 9 where 0 = low, 9 = high; adj: up, down, left, right)

// part1: risk level of low point = 1 + height
// what is sum of risk levels of lowpoints on map

// part2: a basin is all locations that eventually flow down to a single low point
// size of a basin is the # locations (not equal to 9) within basin including low point.
// find 3 largest basins and multiply sizes

const fs = require('fs')
const input = fs.readFileSync('day9.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split('').map(ele => parseInt(ele)))

const Directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const makeKey = (x, y) => `${x}-${y}`

function multiplyThreeLargestBasins(input) {
  // let sumLowPoints = 0                                       // modified for pt2
  let seen = new Set()
  let basins = []

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      const currVal = input[x][y]

      const isLowPoint = (x, y) => {
        for (const dir of Directions) {
          const nx = dir[0] + x, ny = dir[1] + y

          if (nx < 0 || nx >= input.length || ny < 0 || ny >= input[0].length) continue 
          if (input[nx][ny] <= currVal) return false
        }  
        return true
      }

      // if (isLowPoint(x, y)) sumLowPoints += currVal + 1        // modified for pt2

      if (isLowPoint(x, y)) {   
          let sum = 0

          const dfs = (x, y) => {
            const getNeighbors = (x, y) => {
              const neighbors = []

              for (const dir of Directions) {
                const nx = dir[0] + x, ny = dir[1] + y

                if (nx < 0 || nx >= input.length || ny < 0 || ny >= input[0].length) continue 
                neighbors.push([nx, ny])
              } 
              return neighbors 
            }

            let queue = [[x, y]]
            seen.add(makeKey(x, y))
            let size = 1

            while (queue.length) {
              const [cx, cy] = queue.pop()
              const currPosVal = input[cx][cy]

              getNeighbors(cx, cy).forEach(neighbor => {
                const [nx, ny] = neighbor
                const neighborKey = makeKey(nx, ny)

                if (!seen.has(neighborKey) && input[nx][ny] > currPosVal && input[nx][ny] !== 9) {
                  seen.add(neighborKey)
                  queue.push(neighbor)
                  size++
                }   
              })                    
            }
            return size
          }
          basins.push(dfs(x, y))
       }
    }
  }

  // return sumLowPoints                                          // part 1: 554

  basins.sort((a, b) => b - a)
  let product = 1
  for (let i = 0; i < 3; i++) {
    product *= basins[i]
  }
  return product
}

// part2:
console.log(multiplyThreeLargestBasins(input))
// 1017792
