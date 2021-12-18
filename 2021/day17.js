// keys have fallen into an ocean trench. 
// can fire probe with integer velocity in 'x' (forward) and 'y' upward/downward (if negative) direction)
// e.g. [0, 10] fires straight up, [10, -1] fires forward at slight downward angle

// probe starts at [0, 0]
// fired probe's trajectory moves in steps. due to drag, x -= 1 if greater than 0, x += 1 if less than 0, does not change if === 0

// part1: 
// find highest y position probe can reach when hits target 

const fs = require('fs')
const input = fs.readFileSync('day17.txt', 'utf8')
                .match(/-?\d+\.\.-?\d+/g)
                .map(entry => entry.split('..').map(ele => parseInt(ele)))

const [[MinX, MaxX], [MinY, MaxY]] = input
const [startX, startY] = [0, 0]

function highestProbe(input) {
    const diff = Math.abs(startY - MinY)        // bc negative y-range. want least negative y
    return diff * (diff - 1)/2                  // going straight down & up (2x), count lowest once
}

console.log(highestProbe(input))
// 5460

// part2
// how many distinct initial velocity values cause probe to be within target area after any step
                