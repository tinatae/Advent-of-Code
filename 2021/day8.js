// have a malfunctioning four-digit seven-segment display
// each digit rendered by turning on/off any segment named 'a' - 'g'
// currently have mismatched segments to letters
// note: there is a different mismatch set for each of 4-digits

// input formatted as 10 unique signal patterns | four digit output value
// digits 1, 4, 7, 8 have unique # of segments

// part1: how many times do 1, 4, 7, 8 appear
// part2: decode all digits and sum the four-digit displays

const fs = require('fs')

const input = fs.readFileSync('day8.txt', 'utf8')
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

            // [ Map {
            //     Set { 'b', 'e' } => 1,
            //     Set { 'f', 'a', 'b', 'c', 'd' } => -1,
            //     ...
            //     Set { 'e', 'd', 'b' } => 7
            //   },
            //   [ 8, 'cefdb', 'cefbgd', 4 ]
            // ]
            // console.log(input[0])

function sumFourDigitOutputs(input) {
  let workingInput = findUnique(input)

  const pt1 = sumUnique(workingInput)                  // part1: 525

  findThree(workingInput)
  findSix(workingInput)
  findFive(workingInput)
  findTwo(workingInput)
  findNine(workingInput)
  findZero(workingInput)

  return decodedSum(workingInput)
}

function decodedSum(input) {
  let sum = 0
  input.forEach(entry => {
    let [map, fourDigit] = entry

    fourDigit = fourDigit.map(charGroup => {
      if (typeof charGroup === 'number') {
        return charGroup
      } else {
        for (let [key, val] of map.entries()) {
          if (key.size !== charGroup.length) continue
          let count = 0
          for (let char of charGroup) {
            if (key.has(char)) count++
          }
          if (count === charGroup.length) return val
        }
      }
    })
    sum += parseInt(fourDigit.join(''))
  })
  return sum
}

// part2: 1083859

function findZero(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 6 || key === map.get(6) || key === map.get(9)) continue

      map.set(key, 0)
      map.set(0, key)
    }   
  })
}

function findNine(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 6 || key === map.get(6)) continue

      const fiveSet = map.get(5)

      let count = 0
      fiveSet.forEach(char => {
        if (key.has(char)) count++
      })
      if (count === 5) {
        map.set(key, 9)
        map.set(9, key)
      }
    }   
  })
}

function findTwo(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 5 || key === map.get(3) || key === map.get(5)) continue

      map.set(key, 2)
      map.set(2, key)
    }   
  })
}

function findFive(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 5 || key === map.get(3)) continue

      const sixSet = map.get(6)

      let count = 0
      sixSet.forEach(char => {
        if (key.has(char)) count++
      })
      if (count === 5) {
        map.set(key, 5)
        map.set(5, key)
      }
    }   
  })
}

function findSix(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 6) continue

      const oneSet = map.get(1)

      let count = 0

      oneSet.forEach(char => {
        if (key.has(char)) count++
      })

      if (count !== 2) {
        map.set(key, 6)
        map.set(6, key)
      }
    }
  })
}

function findThree(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size !== 5) continue

      const oneSet = map.get(1)

      let count = 0
      
      oneSet.forEach(char => {
        if (key.has(char)) count++
        if (count === 2) {
          map.set(key, 3)
          map.set(3, key)
        }
      })
    }
  })
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

console.log(sumFourDigitOutputs(input))

// 0: a, b, c, e, f, g   not have: d  
// 1: c, f               not have: a, b, d, e, g
// 2: a, c, d, e, g      not have: b, f
// 3: a, c, d, f, g      not have: b, e
// 4: b, c, d, f         not have: a, e, g
// 5: a, b, d, f, g      not have: c, e
// 6: a, b, d, e, f, g   not have: c
// 7: a, c, f            not have: b, d, e, g
// 8: all
// 9: a, b, c, d, f, g   not have: e

// length 5 = [2, 3, 5]
// all have top, mid and bottom
// 2, 3 => swap sw and se
// 3, 5 => swap nw and ne
// 2, 5 => swap nw and ne, swap sw and se

// length 6 = [0, 6, 9]
// all have top, bottom, nw
// 0, 6 => swap mid and ne
// 6, 9 => swap sw and ne
// 9, 0 => swap sw and mid