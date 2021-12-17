
// submarine has polymerization equipment to mix volcanic input elements into sub reinforcement
// given initial polymer template and list of pair insertion rules

// part1: apply pair insertion process to polymer template 10 times 
// and find most and least common elements in result. 
// return # of most common - # of least common

const fs = require('fs')
const input = fs.readFileSync('day14.txt', 'utf8')
                .split(/\n+/)

function polymerizeElements(input, times) {
  let template = input.shift()
  const rules = input.map(ele => ele.split(' -> '))

  const hash = {}
  const counter = {}

  for (const rule of rules) {
    hash[rule[0]] = `${rule[0][0]}${rule[1]}${rule[0][1]}`
  }

  for (const key of Object.keys(hash)) {
    if (!counter[key[0]]) counter[key[0]] = 0
    if (!counter[key[1]]) counter[key[1]] = 0
  }

  for (let char of template) counter[char]++
  
  let nextTemplate = []

  for (let i = 0; i < times; i++) {
    for (let j = 1; j < template.length; j++) {  

      const trio = hash[`${template[j-1]}${template[j]}`]

      if (j !== template.length-1) {
        nextTemplate.push(trio[0], trio[1])   
      } else {
        nextTemplate.push(trio[0], trio[1], trio[2])
      } 
      counter[trio[1]]++       
    }
    template = nextTemplate.join("")
    nextTemplate = []
  }

  const sorted = Object.values(counter).sort((a, b) => b - a)
  return sorted[0] - sorted[sorted.length-1]
}

console.log(polymerizeElements(input, 10))
// 2937

// part2. run 40 times and find most and return # most common - # least common
// refactor time
