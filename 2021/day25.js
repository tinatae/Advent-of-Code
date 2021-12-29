// polite sea cucumbers

// two herds. one moves only east ('>') other moves only south ('v'). 
// ('.' means empty)

// at every step, east-going herd attempts to (simultaneously) move forward , then south-going herd attempts to (simultaneously) move forward
// sea cucumbers that disappear off right edge appear on left, sea cucumbers that disappear off bottom appear at top
// sea cucumbers check destination spot empty before moving even if destination is on opposite side of map

// part1: what is first step where sea cucumbers stop moving?

const fs = require('fs')
const input = fs.readFileSync('day25.txt', 'utf8')
                .split(/\n/)
                .map(row => row.split(''))

function migrateSeaCucumbers(input) {
  let step = 0
  
  let copy = input.map(row => row.map(ele => ele === '>' ? 1 : ele === 'v' ? 2 : 0))

  while (true) {
    const [eastFlag, eastGrid] = migrate(copy, 1)
    const [southFlag, southGrid] = migrate(eastGrid, 2)
    
    copy = southGrid
    step++

    if (!eastFlag && !southFlag) break
  }

  return step
}

function migrate(grid, dir) {
  const nextGrid = grid.map(row => row.map(ele => ele))

  let noChange = false
 
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {

      if (dir === 1) {
        const ny = (j + 1) % grid[0].length

        if (grid[i][j] === 1 && grid[i][ny] === 0) {
          nextGrid[i][j] = 0
          nextGrid[i][ny] = 1  

          if (!noChange) noChange = true
        } 
      } else {
        const nx = (i + 1) % grid.length

        if (grid[i][j] === 2 && grid[nx][j] === 0) {
          nextGrid[i][j] = 0
          nextGrid[nx][j] = 2

          if (!noChange) noChange = true
        } 
      }
    }
  }

  return [noChange, nextGrid]
}

console.log(migrateSeaCucumbers(input))