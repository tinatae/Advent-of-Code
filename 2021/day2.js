const fs = require('fs')

const input = fs.readFileSync('day2.js', 'utf8')
                .split(/\n/)
                
// part1
// submarine takes series of commands
    // 'forward X' increases horizontalPos by X units
    // 'down X' increases depth by X units
    // 'up X' decreases depth by X units

// return horizontalPos x depth

function multiplyDepthAndDist(input) {
  let depth = 0
  let dist = 0

  for (let dir of input) {
    const val = parseInt(dir.match(/\d+/))

    if (dir[0] === 'f') {
      dist += val
    } else if (dir[0] === 'u') {
      depth -= val
    } else {
      depth += val
    }
  }
  return depth * dist
}

console.log(multiplyDepthAndDist(input))
// 1989014

// part2
// need to keep track of 'aim' which also starts at 0
    // 'down X' increases aim by X units
    // 'up X' decreases aim by X units
    // 'forward X' increases horizontalPos by X units & increases depth by (aim * X)

// return horizontalPos x depth

function multiplyWithAim(input) {
    let depth = 0
    let dist = 0
    let aim = 0
  
    for (let dir of input) {
      const val = parseInt(dir.match(/\d+/))
  
      if (dir[0] === 'd') {
        aim += val
      } else if (dir[0] === 'u') {
        aim -= val
      } else {
        dist += val
        depth += (aim * val)
      }
    }
    return depth * dist
  }
  
  console.log(multiplyWithAim(input))
  // 2006917119
