let fs = require("fs");

const input = fs
  .readFileSync("09.txt", "utf8")
  .split(/\n+/)
  .map((num) => parseInt(num));


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

// console.log(slideAlong(input, 25))                   // 10884537

function partTwo(idx, num, length, input) {

  for (let i = idx; i > 0; i--) {
    for (let j = 2; j < length; j++) { 
      var subarr = input.slice(i, i+j);
      let sum = subarr.reduce((sum, val) => sum + val, 0)
      if (sum == num) {
        return Math.min(...subarr) + Math.max(...subarr)
      }
    }
  }
}

// console.log(partTwo(500, 10884537, 25, input))   // 1261309
