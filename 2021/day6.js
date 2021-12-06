const fs = require('fs')
const input = fs.readFileSync('day6.txt', 'utf8')
                .split(',')

// lanternfish create new lanternfish every 7 days
// can model each fish as '# days until it creates a new lanternfish'
// not synchronized birth
// new lanternfish needs 2 extra days after born then enters 7 day loop
// (i.e. babyfish internal timer = 8, not babyfish = 6). note: 0 is a valid timer value

// part1: how many fish after 80 days
// part2: how many fish after 256 days

function countFishAfterXDays(input, days) {
  const schedule = populateSchedule(input)

  for (let i = 0; i < days; i++) {
    const newFishDay = schedule.shift()

    if (newFishDay) {
      schedule[6] += newFishDay
      schedule.push(newFishDay)
    } else {
      schedule.push(0)
    }
  }

  return schedule.reduce((a, b) => a + b, 0)
}

function populateSchedule(input) {
  const schedule = Array(9).fill(0)
  input.forEach(val => {
    schedule[parseInt(val)]++
  })
  return schedule
}

console.log(countFishAfterXDays(input, 80))
// 350917
console.log(countFishAfterXDays(input, 256))
// 1592918715629


