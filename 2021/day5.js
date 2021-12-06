// hydrothermal vents tend to form in lines (given as input)
// pt1: consider horizontal & vertical lines for now
// determine # points where at least 2 lines overlap

// p2: include diagonals (45 degree). same thing

const fs = require('fs')

const input = fs.readFileSync('day5.txt', 'utf8')
                .split(/\n/)
                .map(entry => {
                    const splitPos = entry.split(' -> ')
                    const pos1 = splitPos[0].split(',').map(coord => parseInt(coord))
                    const pos2 = splitPos[1].split(',').map(coord => parseInt(coord))
                    return [pos1, pos2]
                })

const isDiagonal = (pos1, pos2) => {
  const [x1, y1] = pos1
  const [x2, y2] = pos2
  return Math.abs(y2-y1) === Math.abs(x2-x1)
}

const filterData = (input, includeDiagonals) => {
  const meetCondition = []

  input.forEach(entry => {
    if (includeDiagonals) {
      if (entry[0][0] === entry[1][0] || entry[0][1] === entry[1][1] || isDiagonal(entry[0], entry[1]))
        meetCondition.push(entry)  
    } else {
      if (entry[0][0] === entry[1][0] || entry[0][1] === entry[1][1])
        meetCondition.push(entry)   
    }
  })
  return meetCondition
}

function findAtLeastTwoOverlapping(input, includeDiagonals=false) {
  const data = filterData(input, includeDiagonals)
  
  const hash = {}

  data.forEach(entry => {
    const [[x1, y1], [x2, y2]] = entry

    let xSmall = Math.min(x1, x2), xLarge = Math.max(x1, x2), 
        ySmall = Math.min(y1, y2), yLarge = Math.max(y1, y2)

    if (isDiagonal([x1, y1], [x2, y2])) {
      if ((x1 === xSmall && y1 === ySmall) || (x2 === xSmall && y2 === ySmall)) {     // SE to NW. both increasing    
        while (xSmall <= xLarge) {
          addPos([ySmall, xSmall], hash)
          xSmall++
          ySmall++
        }
      } else {                                                                        // SW to NE. invert
        while (ySmall <= yLarge) {
          addPos([ySmall, xLarge], hash)
          xLarge--
          ySmall++             
        }
      }
    } else if (x1 === x2) {
      for (let i = ySmall; i <= yLarge; i++) {
        addPos([i, x1], hash)    
      }
    } else if (y1 === y1) {
      for (let i = xSmall; i <= xLarge; i++) {
        addPos([y1, i], hash)
      }
    } 
  })
  return countOverlaps(hash)
}

function addPos(pos, hash) {
  const key = `${pos}`
  if (!hash[key]) hash[key] = 0
  hash[key]++
}

function countOverlaps(hash) {
  let count = 0

  Object.keys(hash).forEach(key => {
    if (hash[key] > 1) count++
  })
  return count
}

console.log(findAtLeastTwoOverlapping(input))
// 4873
console.log(findAtLeastTwoOverlapping(input, true))
// 19472