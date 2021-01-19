const fs = require('fs');

const input = fs.readFileSync('13.txt', 'utf8').split(/\n+/)

// PART ONE:

function fastestBus(data) {
  [timeStamp, ids] = data

  let busRoutes = ids.split(",").filter(ele => ele !== "x").map(ele => parseInt(ele))
  
  let waitTimes = {}

  busRoutes.forEach(route => {

    if (!waitTimes[route]) {
      waitTimes[route] = [0, 0]
    }

    waitTimes[route] = keepDividing(timeStamp, route)
  })

  return bestRide(waitTimes)
}

function keepDividing(timeStamp, route) {
  counter = 0
  while (timeStamp > route) {
    timeStamp -= route
    counter += 1
  }
  return [counter, timeStamp]
}

function bestRide(hash) {
  let minWait = [0, Infinity]

  Object.keys(hash).map(key => (hash[key] = parseInt(key) - hash[key][1]))

  Object.keys(hash).forEach(key => {
    if (hash[key] < minWait[1]) {
      minWait = [parseInt(key), hash[key]]
    } 
  })
  return minWait.reduce((acc, ele )=> acc * ele, 1)
}

console.log(fastestBus(input))              // 333