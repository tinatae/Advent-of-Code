// map the floor of ocean trench

// given image enhancement algorithm (512 char string)
// and input image (2D grid of light pixels ('#') and dark pixels ('.'))

// enhancement alg describes how enhance image by simultaneously converting all pixels in input image into output image
// each pixel of output determined by looking at 3x3 square of pixels centered on corresponding input image pixel (NW => SE)

// 9 input pixels combined into single binary number that is used as index in image enhancement alg string
// dark pixel => 0, light pixel => 1 // e.g. ...#...#. => 000100010 => 34

// algorithm string has index matching every possible 9-bit binary number
// value at index is value of output pixel

// images have infinite negative space and can be enhanced multiple times using output image as next input

// part1: start with original input image & apply enhancement algorithm twice
// how many pixels are lit in the resulting image

// part2: enhance 50 times. how many light pixels in resulting image

const fs = require('fs')
const input = fs.readFileSync('day20.txt', 'utf8')
                .split(/\n\n/)

const imageAlg = input[0]
const image = input.slice(1).join(/\n/).split(/\n/).map(row => row.split(''))

const Neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]

function enhanceTimes(image, num) {
  for (let i = 0; i < num; i++) {
    const filler = imageAlg[0] === '#' && i % 2 ? 1 : 0
    image = enhance(image, filler)
  }
  return countLightPixels(image)
}

function countLightPixels(image) {
  return image.flat().filter(ele => ele === '#').length
}

function enhance(image, filler) {
  const copy = Array(image.length + 2).fill(0).map(_ => Array(image[0].length + 2).fill(filler))

  for (let i = -1; i < image.length + 1; i++) {
    for (let j = -1; j < image[0].length + 1; j++) {
      
      const neighborString = Neighbors.map(([nx, ny]) => {
        const x = nx + i, y = ny + j
        return !image[x] || !image[x][y] ? filler : image[x][y] === '#' ? 1 : 0
      }).join('')

      const idx = parseInt(neighborString, 2)

      copy[i+1][j+1] = imageAlg[idx]
    }
  }
  return copy
}

console.log(enhanceTimes(image, 2))
// 5326
console.log(enhanceTimes(image, 50))
// 17096