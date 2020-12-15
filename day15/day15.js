// They're playing a memory game. In this game, the players take turns saying numbers. 
// They begin by taking turns reading from a list of starting numbers (your puzzle input). 
// Then, each turn consists of considering the most recently spoken number:

// If that was the first time the number has been spoken, the current player says 0.
// Otherwise, the number had been spoken before; the current player announces how many turns apart 
// the number is from when it was previously spoken.

// So, after the starting numbers, each turn results in that player speaking aloud either 0 
// (if the last number is new) or an age (if the last number is a repeat).

// PART ONE: what will be the 2020th number spoken?
function memoryGame(arr, target) {
  set = new Set
  hash = {}

  arr.forEach((num, idx) => {
    hash[num] = idx
    set.add(num)
  })

  while (arr.length < target) {
    let prevIdx = arr.length-1
    let prevNum = arr[prevIdx]
    // console.log(prevIdx)

    if (!set.has(prevNum)) {
      hash[prevNum] = prevIdx
      set.add(prevNum)
      arr.push(0)
    } else {
      arr.push(prevIdx - hash[prevNum.toString()]) 
      hash[prevNum] = prevIdx  
    }
  }

  return arr[arr.length-1]
}

// const input = [1,12,0,20,8,16]
// console.log(memoryGame(input, 2020))        // RETURNS 273

// PART TWO: determine the 30000000th number

function memoryGame(arr, target) {
  let map = new Map()

  arr.forEach((num, idx) => {
    map.set(num, idx)
  })

  let count = arr.length
  let prevIdx = count-1
  let prevNum = arr[prevIdx]

  while (count < target) {
    if (!map.has(prevNum)) {
      map.set(prevNum, prevIdx)
      prevNum = 0
    } else {
      let diff = prevIdx - map.get(prevNum)
      map.set(prevNum, prevIdx)
      prevNum = diff  
    }
    count++
    prevIdx++
  }
  return prevNum        
}

// const input = [1,12,0,20,8,16]
// console.log(memoryGame(input, 30000000))        // RETURNS 47205