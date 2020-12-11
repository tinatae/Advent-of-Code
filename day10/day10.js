// Any given adapter can take an input 1, 2, or 3 jolts lower than its rating and still produce its rated output joltage.
// In addition, your device has a built-in joltage adapter rated for 3 jolts higher than the highest-rated adapter in your bag. 

// PART ONE
// Treat the charging outlet near your seat as having an effective joltage rating of 0.
// Find a chain that uses all of your adapters to connect the charging outlet to your device's built-in adapter 
// and count the joltage differences between the charging outlet, the adapters, and your device. 
// What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

const fs = require('fs')

const input = fs.readFileSync("10.txt", "utf8").split(/\n+/).map(num => parseInt(num))

function mergeSort(arr) {
  if (arr.length < 2) {return arr}

  let midIdx = Math.floor(arr.length/2)

  let left = arr.slice(0, midIdx)
  let right = arr.slice(midIdx)

  let leftSorted = mergeSort(left)
  let rightSorted = mergeSort(right)

  return mergeSorted(leftSorted, rightSorted)

}

function mergeSorted(left, right) {
  const answer = []

  while (left.length || right.length) {
    let firstLeft = left.length ? left[0] : Infinity
    let firstRight = right.length ? right[0] : Infinity

    if (firstLeft < firstRight) {
      answer.push(left.shift())
    } else {
      answer.push(right.shift())
    }
  }
  return answer
}

function onesMultipliedThrees(arr) {
  const sorted = mergeSort(arr)

  let threes = 1
  let ones = 1

  for (let i = 0; i <= sorted.length; i++) {
    if (sorted[i+1] - sorted[i] === 1) {
      ones++
    } else if (sorted[i+1] - sorted[i] === 3) {
      threes++
    } 

  }
  return ones * threes              
}

// console.log(onesMultipliedThrees(input))                             // RETURNS 2112

// PART TWO: To completely determine whether you have enough adapters, 
// you'll need to figure out how many different ways they can be arranged. 
// Every arrangement needs to connect the charging outlet to your device. 
// The previous rules about when adapters can successfully connect still apply.

// EXAMPLE SET: (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)  // NOTE THE ADDITIONAL 0 && 22

function findWaysToCharge(arr) {
  var sorted = mergeSort(arr)
  sorted.unshift(0)
  return combo(sorted)
}

function combo(arr, memo={}) {
  let key = arr
  if (key in memo) {
    return memo[key]
  }

  let count = 1;
  for (let i = 1; i < arr.length-1; i++) {
    if (arr[i+1] - arr[i-1] <= 3) {
      var arr2 = [arr[i-1]].concat(arr.slice(i+1))
      count += combo(arr2, memo) 
    }
  }
  memo[key] = count
  return count
}

// console.log(findWaysToCharge(input))                     // RETURNS 3022415986688