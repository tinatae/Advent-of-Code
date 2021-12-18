// chiton-lined cave
// given grid where # at each idx is risk level val. cannot move diagonally. 
// part1: find lowest total sum path from top left to bottom right minus starting idx val

// part2: cave is 5x larger in both dimensions & each subsequent grid is += 1 for each val
// (y gets += 1 going right, x get += 1 going down)
// if val > 9, wrap back to 1
// find lowest total path again.

const fs = require('fs')
const input = fs.readFileSync('day15.txt', 'utf8')
                .split(/\n/)
                .map(row => row.split('').map(ele => parseInt(ele)))

const Dir = [[-1, 0], [0, -1], [1, 0], [0, 1]]

function minRiskPath(input, multiplier=1) {
  const totalHeight = input.length * multiplier
  const totalWidth = input[0].length * multiplier

  const height = input.length
  const width = input[0].length

  const counter = Array(totalHeight).fill(0).map(_ => Array(totalWidth).fill(Infinity))
  const pq = new PriorityQueue((a, b) => a[1] > b[1])

  pq.insert([[0, 0], 0])

  while (pq.size()) {
    const [[x, y], count] = pq.remove();

    if (x < 0 || y < 0 || x >= totalHeight || y >= totalWidth) continue;

    let currVal = input[x % height][y % width] + Math.floor(x/height) + Math.floor(y/width)
    if (currVal > 9) currVal -= 9

    if (count + currVal >= counter[x][y]) continue
    counter[x][y] = count + currVal

    if (x === totalHeight - 1 && y === totalWidth - 1) return counter[totalHeight - 1][totalWidth - 1] - input[0][0]

    for (const [nx, ny] of Dir) {
      pq.insert([[x + nx, y + ny], counter[x][y]])
    }
  }
}

class PriorityQueue {
  constructor(compFunction) {
    this.heap = [];
    this.compFunction = compFunction;
  }

  size() {
    return this.heap.length;
  }
  
  remove() {
    if (this.size() < 2) return this.heap.pop();
    
    this.swap(0, this.heap.length-1)
    const popped = this.heap.pop();
    this.siftDown(0, this.heap.length-1);
    return popped;
  }
    
  insert(val) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1);
  }
  
  siftUp(startIdx) {
    let parent = Math.floor((startIdx - 1) / 2);
    
    while (startIdx && this.prioritize(parent, startIdx)) {
        this.swap(startIdx, parent)
        startIdx = parent;
        parent = Math.floor((startIdx-1)/2)
    }
  }
  
  siftDown(startIdx, endIdx) {
    let childOne = startIdx * 2 + 1
    while (childOne <= endIdx) {
      const childTwo = childOne + 1 <= endIdx ? childOne + 1 : -1
      const swapIdx = childTwo !== -1 && this.prioritize(childOne, childTwo) ? childTwo : childOne
      
      if (this.prioritize(startIdx, swapIdx)) {
          this.swap(swapIdx, startIdx)
          startIdx = swapIdx
          childOne = startIdx * 2 + 1
      } else {
          return
      }
    }
  }

  prioritize(idx1, idx2) {                                               
    return this.compFunction(this.heap[idx1], this.heap[idx2]) > 0;   
  }                                                                     

  swap(idx1, idx2) {
    let temp = this.heap[idx1]
    this.heap[idx1] = this.heap[idx2]
    this.heap[idx2] = temp
  }
}

console.log(minRiskPath(input))
// 487
console.log(minRiskPath(input, 5))
// 2821