// have a malfunctioning four-digit seven-segment display
// each digit rendered by turning on/off any segment named a through g
// currently have mismatched segments to letters
// * there is a different mismatch set for each of 4-digits

// input formatted as 10 unique signal patterns | four digit output value
// write down single four digit output value
// 1, 4, 7, 8 have unique # segments
// part1: how many times do 1, 4, 7, 8 appear

const fs = require('fs')

// const input = fs.readFileSync('day8.txt', 'utf8')
const input = fs.readFileSync('test.txt', 'utf8')
                .split(/\n/)
                .map(line => line.split(' | '))
                .map(entries => { 
                  let map = new Map()
                  entries[0].split(' ').forEach(charGroup => {
                    const key = new Set(charGroup.split(""))
                    map.set(key, -1)
                  })                
                  entries[0] = map
                  entries[1] = entries[1].split(' ')
                  return entries
                })

function sumFourDigitOutputs(input) {
    let workingInput = findUnique(input)

    const pt1 = sumUnique(workingInput)               
    // console.log(pt1)                                // 525
}

function findUnique(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, num] of map.entries()) {
      if (key.size === 5 || key.size === 6) continue
      if (key.size === 2) {
        map.set(key, 1)
        map.set(1, key)
        continue
      }
      if (key.size === 3) {
        map.set(key, 7)
        map.set(7, key)
        continue
      }
      if (key.size === 4) {
        map.set(key, 4)
        map.set(4, key)
        continue
      }
      if (key.size === 7) {
        map.set(key, 8)
        map.set(8, key)
        continue
      }
    }

    const mapped = fourDigit.map(str => 
      str.length === 2 ? 1 : 
      str.length === 3 ? 7 :
      str.length === 4 ? 4 :
      str.length === 7 ? 8 :
      str
    )
    return [map, mapped]
  })
}

function sumUnique(input) {
  let sum = 0
  input.forEach(entry => {
    entry[1].forEach(val => {
      if (typeof val !== 'string') sum++    
    })
  })
  return sum
}