// The floor is being renovated. The tiles are all hexagonal; they need to be arranged in a hex grid with a specific color pattern. 

// The tiles are all white on one side and black on the other. They start with the white side facing up. 
// The lobby is large enough to fit whatever pattern might need to appear there.

// You are given a list of the tiles that need to be flipped over (your puzzle input). 
// Each line in the list identifies a single tile that needs to be flipped by giving a series of steps starting from a reference tile
// in the very center of the room. (Every line starts from the same reference tile.)

// Because the tiles are hexagonal, every tile has six neighbors: east, southeast, southwest, west, northwest, and northeast. 
// These directions are given in your list, respectively, as e, se, sw, w, nw, and ne. 
// A tile is identified by a series of these directions with no delimiters.

// Each time a tile is identified, it flips from white to black or from black to white. Tiles might be flipped more than once. 

// PART ONE: 
// Go through the renovation crew's list and determine which tiles they need to flip. 
// After all of the instructions have been followed, how many tiles are left with the black side up?

const fs = require('fs')

let input = fs.readFileSync('24.txt', 'utf-8').split(/\n/)

let ref = [0, 0]

function flipTile(input, ref) {

  let command
  let startingPoint = ref
  
  let flipped = new Set()

  while (input.length) {

    command = input.shift().split("")

    let finalSpot = getFinalSpot(command, startingPoint)

    let storedPos = `[${finalSpot[0]}][${finalSpot[1]}]`

    flipped.has(storedPos) ? (flipped.delete(storedPos)) : (flipped.add(storedPos))

  }

  return flipped.size
  
}

function getFinalSpot(command, startPoint) {

  let pos = startPoint

  while (command.length) {

    let dir = command.shift()

    if (dir == 's' || dir == 'n') {
      dir += command.shift()
    }

    let next_pos = navigate(dir, pos)
    
    pos = next_pos
  }

  return pos

}

function navigate(dir, pos) {
  let new_pos = [x, y] = pos

   switch(dir) {
    case 'e':
      return new_pos = [x+1, y]
    case 'se':
      return new_pos = [x, y-1]
    case 'sw':
      return new_pos = [x-1, y-1]
    case 'w':
      return new_pos = [x-1, y]
    case 'nw':
      return new_pos = [x, y+1]
    case 'ne':
      return new_pos = [x+1, y+1]
    default:    
      console.log('Sorry direction is unknown')      
  }    
}

console.log(flipTile(input, ref)) // 346