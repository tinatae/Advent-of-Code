// snailfish have seen the keys! 
// but you need to help them with their math homework

// every snailfish number is a pair: an ordered list of two elements
// each element of pair can be regular number or another pair

// snailfish addition:
    // [1, 2] + [[3, 4], 5] => [[1, 2], [[3, 4], 5]]
    // reduction rules apply:
        // if any Pair nested inside 4 pairs, leftmost pair explodes
        // if any Regular Number >= 10, leftmost regular number splits
        // at most one action applies after which process returns to top and continues/reduces again, etc.

        // exploding pair
            // pair's left value added to first regular number to left of exploding pair (if any)
            // pair's right value added to first regular numebr to right of exploding pair (if any)
            // exploding pair will always consist of two regular numbers
            // exploded pair replaced with '0'
        
        // splitting regular number
            // left element = regular number divided by 2, rounded down
            // right element = regular number divided by 2, rounded up

// once stop reducing, remaining result is answer to addition operation

// snailfish teacher cheks magnitude of final sum
    // magnitude of pair = 3x left element + 2x right element
        // and is recursive
        // e.g. [[9, 1], [1, 9]] => 3 * ((3*9) + (2*1)) + 2 * ((3*1) + (2*9))
    // magnitude of regular number = regular number

// part1: add up list of snailfish numbers and return magnitude

const fs = require('fs')
const input = fs.readFileSync('day18.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split(',').join(''))
                .map(line => line.split('').map(char => char !== "[" && char !== ']' ? Number(char) : char))

const concat = (arr1, arr2) => ["[", ...arr1, ...arr2, "]"]

function sumSnailfishNumbers(input) {
  let sum = ''

  for (let i = 1; i < input.length; i++) {
    sum = !sum ? concat(input[i-1], input[i]) : concat(sum, input[i])

    while (explode(sum) || splitDoubleDigit(sum)) {
      explode(sum)
      splitDoubleDigit(sum)
    }
  }
  return calculateMagnitude(sum)
}

function explode(arr) {
  let countNested = 0

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i]

    countNested = char === '[' ? countNested + 1 : char === ']' ? countNested - 1 : countNested

    if (countNested === 5) {
      const slice = arr.splice(i, 4, 0)                 // replace next 4 chars with 0

      let high = i + 1

      while (high < arr.length) {
        if (Number.isInteger(arr[high])) {
          arr[high] += slice[2]
          break
        }
        high++
      }

      let low = i - 1

      while (low >= 0) {
        if (Number.isInteger(arr[low])) {
          arr[low] += slice[1]
          break
        }
        low--
      }   
      return explode(arr)
    }
  }
  return false
}

function splitDoubleDigit(arr) {
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];

    if (Number.isInteger(char) && char > 9) {
      const replacement = ['[', Math.floor(char/2), Math.ceil(char/2), ']']

      return arr.splice(i, 1, ...replacement)
    }
  }
  return false 
}

function calculateMagnitude(arr) {
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i]

    if (char === ']') {
      const subMag = (arr[i-2] * 3) + (arr[i-1] * 2)

      arr.splice(i-3, 4, subMag)
      calculateMagnitude(arr)
    }
  }
  return arr[0]
}

console.log(sumSnailfishNumbers(input))
// 3756

// part2: what is largest magnitude from adding only two snailfish nums
// note: snailfish addition not commutative.

function maxTwoNumSum(input) {
  let max = -Infinity

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 1; j < input.length; j++) {

      if (i !== j) {
        const sum = concat(input[i], input[j])

        while (explode(sum) || splitDoubleDigit(sum)) {
          explode(sum)
          splitDoubleDigit(sum)
        }

        max = Math.max(max, calculateMagnitude(sum))
      }
    }
  }
  return max
}

console.log(maxTwoNumSum(input))
// 4585

    


