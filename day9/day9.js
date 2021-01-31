let fs = require("fs");

const input = fs.readFileSync("9.txt", "utf8").split(/\n+/).map((num) => parseInt(num));

// Encryption starts by transmitting preamble of 25 numbers. After that, each number should be the sum of any two of the 25 immediately previous numbers.
// The two summed numbers will have different values, and there might be more than one such pair.
// PART ONE: Find the first number in the list after the preamble which is not the sum of two of the 25 numbers before it

function slideAlong(arr, length) {
  var i = length;

  while (i < arr.length) {
    var window = arr.slice(i - length, i);

    if (hasPair(window, arr[i])) {
      i += 1;
    } else {
      console.log(arr[i]);
    }
  }
}

function hasPair(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.includes(num-arr[i]) && arr[i] !== num-arr[i]) {
      return true
    }
  }
  return false
}

// console.log(slideAlong(input, 25))                   // RETURNS 10884537

// PART TWO: 
// Find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1

function partTwo(idx, num, length, input) {
  for (let i = idx; i > 0; i--) {
    for (let j = 2; j < length; j++) { 
      var subarr = input.slice(i, i+j);
      let sum = subarr.reduce((sum, val) => sum + val, 0)
      if (sum === num) {
        return Math.min(...subarr) + Math.max(...subarr)
      }
    }
  }
}

// console.log(partTwo(500, 10884537, 25, input))   // 1261309
