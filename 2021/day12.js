// find best path through cave system
// goal is find # distinct paths that start at start, end at end
// and visit big caves (uppercase) any # times, and small caves (lowercase) at most once
// part1: how many paths that visit small caves at most once?
// part2: how many paths that visit 1 small cave up to 2x and other small caves, if decide to visit, up to 1x

const fs = require('fs')
const input = fs.readFileSync('day12.txt', 'utf8')
                .split(/\n/)
                .map(ele => ele.split('-'))
        // {
        //   dc: [ [ 'end', 'HN', 'LN', 'kj' ], true ],
        //   end: [ [ null ], true ],
        //   start: [ [ 'HN', 'kj', 'dc' ], true ],
        //   HN: [ [ 'dc', 'end', 'kj' ], true ],
        //   LN: [ [ 'dc' ], true ],
        //   kj: [ [ 'sa', 'HN', 'dc' ], true ],
        //   sa: [ [ 'kj' ], true ]
        // }

function findDistinctPaths(input, allowDoubleVisit=false) {
  
  const graph = buildGraph(input, allowDoubleVisit)
  
  let count = 0

  let queue = [ [['start'], allowDoubleVisit] ]

  while (queue.length) {
    let next = []

    while (queue.length) {
      let [prevPath, allowDbl] = queue.pop()

      graph[prevPath[prevPath.length-1]][0].forEach(pos => {
        if (!pos) {
          count++
        } else {
          const nextPath = [...prevPath, pos]
          const includesPos = prevPath.includes(pos)

          if (pos[0].charCodeAt() < 91 || (allowDbl && !includesPos)) {
            next.push([nextPath, allowDbl])
          } else if ((!allowDbl && !includesPos) || (allowDbl && includesPos)) {
            next.push([nextPath, false])
          } 
        } 
      })
    }
    queue = next
  }
  return count
}

function buildGraph(input, allowDoubleVisit) {
  let graph = {}
  
  input.forEach(entry => {
    const [start, end] = entry

    if (end !== 'start') {
      if (!(start in graph)) graph[start] = []
      graph[start].push(end)
    }

    if (start !== 'start') {
      if (!(end in graph)) graph[end] = []
      graph[end].push(start)
    }

    graph['end'] = [null]
  })

  Object.keys(graph).forEach(key => graph[key] = [graph[key], allowDoubleVisit])

  return graph
}

console.log(findDistinctPaths(input))
// 5457
console.log(findDistinctPaths(input, true))
// 128506