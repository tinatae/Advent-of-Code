// Cups will be arranged in a circle and labeled clockwise (your puzzle input). 
// i.e. if your labeling = 32415, there would be five cups. Going clockwise around the circle the cups would be labeled 3, 2, 4, 1, 5, then back to 3 again.

// Before the crab starts, it will designate the first cup in your list as the current cup. 
// The crab is then going to do 100 moves.

// Each move, the crab does the following actions:

// The crab picks up the three cups that are immediately clockwise of the current cup. They are removed from the circle; 
// cup spacing is adjusted as necessary to maintain the circle.

// The crab selects a destination cup: the cup with a label equal to the current cup's label minus one. 
// If this would select one of the cups that was just picked up, keep subtracting one until it finds a cup that wasn't just picked up. 
// If at any point in this process the value goes below the lowest value on any cup's label, it wraps around to the highest value on any cup's label instead.

// The crab places the cups it just picked up so that they are immediately clockwise of the destination cup. 
// They keep the same order as when they were picked up. The crab selects a new current cup: which is the cup immediately clockwise of the current cup.

// PART ONE: Using your labeling, simulate 100 moves. what order will the cups be in? 
// Starting after the cup labeled 1, collect the other cups' labels clockwise into a single string with no extra characters; 
// each number except 1 should appear exactly once. What are the labels on the cups after cup 1?

const input = 586439172
// const example = 389125467

function crabCup(num) {
  let cups = num.toString().split("").map (val => parseInt(val))

  let count = 0

  while (count < 100) {
    let start = cups.shift()
    let removed = cups.slice(0, 3)
    let remaining = cups.slice(3)

    let destination_cup = destination(start, removed, remaining)
    let remaining_idx = remaining.indexOf(destination_cup)

    let next_cups = remaining.slice(0, remaining_idx+1).concat(removed).concat(remaining.slice(remaining_idx+1)).concat([start])

    count += 1
    cups = next_cups
  }

  let cups_idx_one = cups.indexOf(1)

  return cups.slice(cups_idx_one+1).concat(cups.slice(0, cups_idx_one)).join("")

}

function destination(val, removed, remaining) {
  removed = new Set(removed)
  remaining = new Set(remaining)

  let start = (val === 1) ? (9) : (val-1)

  while (removed.has(start)) {
    if (start === 1) {
      start = 10
    }
    start -= 1
  }

  return start
}

console.log(crabCup(input))         // PART ONE: 28946753

// PART TWO:
// The crab starts arranging one million (1000000) cups in total.
// Labeling is still correct for the first few cups; after that, the remaining cups are just numbered in an increasing fashion 
// starting from the number after the highest number in your list and proceeding one by one until one million is reached. 
// In this way, every number from one through one million is used exactly once.

// Additionally, the crab is going to do ten million (10000000) moves!

// Determine which two cups will end up immediately clockwise of cup 1. What do you get if you multiply their labels together?

const input = 586439172

function millionCrabCups(num) {
    
    let cups = num.toString().split("").map(val => parseInt(val));

    let nextCup = [...Array(1000002).keys()].slice(1)
  
    nextCup[0] = nextCup[nextCup.length-1] = cups[0];

    cups.forEach((cup, i) => {nextCup[cup] = cups[i+1]})

    nextCup[cups[cups.length - 1]] = 10;

    let currIdx = 0
    let iter = 0
  
    while (iter <= 10000000) {  
        currIdx = nextCup[currIdx];
        let start = (currIdx === 1) ? (1000000) : (currIdx - 1);

        let remove1 = nextCup[currIdx];
        let remove2 = nextCup[remove1];
        let remove3 = nextCup[remove2];

        while ([remove1, remove2, remove3].includes(start)) {
            if (start === 1) {
              start = 1000001
            }
            start -= 1
        }

        [nextCup[remove3], nextCup[start], nextCup[currIdx]] = [nextCup[start], nextCup[currIdx], nextCup[remove3]]     // NEED TO SWAP AT SAME TIME

        iter++
    }
    return nextCup[1] * nextCup[nextCup[1]];
}

console.log(millionCrabCups(input))         // PART TWO: 519044017360