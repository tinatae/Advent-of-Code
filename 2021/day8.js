// have a malfunctioning four-digit seven-segment display
// each digit rendered by turning on/off any segment named 'a' - 'g'
// currently have mismatched segments to letters
// note: there is a different mismatch set for each set of displays

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
                  return [map, entries[1].split(' ')]
                })

                // [ Map {
                //     Set { 'b', 'e' } => 1,
                //     Set { 'f', 'a', 'b', 'c', 'd' } => -1,
                //     ...
                //     Set { 'e', 'd', 'b' } => 7
                //   },
                //   [ 8, 'cefdb', 'cefbgd', 4 ]
                // ]

function sumFourDigitOutputs(input) {
  let workingInput = findUnique(input)

  console.log(sumUnique(workingInput))                // 525

  findThreeAndSix(workingInput)
  findFiveAndTwo(workingInput)
  findNineAndZero(workingInput)

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
          for (const char of charGroup) {
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

// pt2: 1083859

const setMap = (key, num, map) => {
  map.set(key, num)
  map.set(num, key)
}

function findNineAndZero(input) {
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
        setMap(key, 9, map)
      } else {
        setMap(key, 0, map)
      }
    }   
  })
}

function findFiveAndTwo(input) {
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
        setMap(key, 5, map)
      } else {
        setMap(key, 2, map)
      }
    }   
  })
}

function findThreeAndSix(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, val] of map.entries()) {
      if (typeof key === 'number') continue
      if (key.size === 5 || key.size === 6) {
        const oneSet = map.get(1)
        let count = 0

        oneSet.forEach(char => {
          if (key.has(char)) count++
        })

        if (key.size === 5 && count === 2) {
          setMap(key, 3, map)
        } else if (key.size === 6 && count !== 2) {
          setMap(key, 6, map)
        }
      }
    }
  })
}

function findUnique(input) {
  return input.map(entry => {
    const [map, fourDigit] = entry

    for (const [key, num] of map.entries()) {
      if (key.size === 5 || key.size === 6) continue
      if (key.size === 2) {
        setMap(key, 1, map)
      } else if (key.size === 3) {
        setMap(key, 7, map)
      } else if (key.size === 4) {
        setMap(key, 4, map)
      } else if (key.size === 7) {
        setMap(key, 8, map)
      }
    }

    const identifyByLength = fourDigit.map(str => 
      str.length === 2 ? 1 : 
      str.length === 3 ? 7 :
      str.length === 4 ? 4 :
      str.length === 7 ? 8 :
      str
    )
    return [map, identifyByLength]
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