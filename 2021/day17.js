// keys have fallen into an ocean trench. 
// can fire probe with integer velocity in 'x' (forward) and 'y' upward/downward (if negative) direction)
// e.g. [0, 10] fires straight up, [10, -1] fires forward at slight downward angle

// probe starts at [0, 0]
// fired probe's trajectory moves in steps. 
// due to drag, x velocity -= 1 if greater than 0, += 1 if less than 0, does not change if === 0
// due to gravity, y velocity -= 1

// part1: 
// find highest y position probe can reach when hits target 

const fs = require('fs')
const input = fs.readFileSync('day17.txt', 'utf8')
                .match(/-?\d+\.\.-?\d+/g)
                .map(entry => entry.split('..').map(ele => parseInt(ele)))

const [[MinX, MaxX], [MinY, MaxY]] = input
const [startX, startY] = [0, 0]

function highestProbe(input) {
    const diff = Math.abs(startY - MinY)                    // bc negative y-range. want least negative y
    return diff * (diff - 1)/2                              // going straight down & up (2x), count lowest once
}

console.log(highestProbe(input))
// 5460

// part2
// count # distinct initial velocity values that allow probe to be within target area after any step

function distinctVelocities(input) {
  let counter = 0

  for (let i = startX; i <= MaxX; i++) {
    for (let j = MinY; j < Math.abs(MinY); j++) {           // upperbound = -MinY 

      let currX = startX
      let currY = startY

      let xVel = i
      let yVel = j

      while (currX <= MaxX) {

        currX += xVel
        xVel = xVel < 0 ? (xVel + 1) : xVel > 0 ? xVel - 1 : 0

        currY += yVel
        yVel--

        if (currY < MinY || currX > MaxX) break

        if (currX >= MinX && currX <= MaxX && currY >= MinY && currY <= MaxY) {
          counter++
          break
        }
      }
    }
  }
  return counter
}

console.log(distinctVelocities(input))
// 3618
                