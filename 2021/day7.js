const fs = require('fs')

const input = fs.readFileSync('day7.txt', 'utf8')
                .split(',')
                .map(ele => parseInt(ele))

// given list of horizontal position of crab submarines. need to align all using least total fuel
// part1: find optimum fuel given that 1 pos = 1 fuel unit
// part2: find optimum fuel given that 1 pos = 1 fuel, 2 pos = 3 fuel, 4 pos = 6, etc.

function alignCrabSubs(input, expensiveFuel) {
  input.sort((a, b) => a - b)

  if (!expensiveFuel) {
    const median = input[Math.floor((input.length-1)/2)]

    return input.reduce((acc, currVal) => acc += Math.abs(currVal - median), 0)
  } else {
    const lowVal = input[0], highVal = input[input.length-1]

    const memo = Array(highVal - lowVal).fill(0).map((_, idx) => idx * (idx+1)/2)

    let bestFuel = Infinity

    for (let startVal = lowVal; startVal < highVal; startVal++) {
      const comp = input.reduce((acc, currVal) => acc + memo[Math.abs(startVal - currVal)], 0)

      if (bestFuel <= comp) return bestFuel
      bestFuel = comp
    }
    return bestFuel
  }
}

console.log(alignCrabSubs(input, false))
// 353800
console.log(alignCrabSubs(input, true))
// 98119739