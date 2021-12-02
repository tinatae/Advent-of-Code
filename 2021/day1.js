const fs = require('fs')

const input = fs.readFileSync('day1.txt', 'utf8')
                .split(/\n/)
                .map(val => parseInt(val))

// part1
// count # times depth measurement increases from previous measurement
const comp = (a, b) => a < b

function nextIncreasing(input) {
    return input.filter((_, idx) => comp(input[idx-1], input[idx])).length
}

// const test = [1]
// console.log(nextIncreasing(test))    // 0

console.log(nextIncreasing(input))
// 1301

// part2
// numbers are now summed in 3-number sliding window
// count # times sum increases
function summedIncreasing(input) {
    return input.filter((_, idx) => comp(input[idx-1], input[idx + 2])).length
}

console.log(summedIncreasing(input))
// 1346

