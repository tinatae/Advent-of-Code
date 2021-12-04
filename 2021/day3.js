const fs = require('fs')

const input = fs.readFileSync('day3.txt', 'utf8')
                .split(/\n/)

// part1
// given list of binary numbers
// find gamma (= new binary of most common input bit in every position) 
// and epsilon (= new binary of least common input bit in every position)
// convert to decimal and multiply together (= submarine power consumption)

function multiplyGammaEpsilon(input) {
    const gBinary = Array(input[0].length).fill(null)
  
    for (let i = 0; i < input[0].length; i++) {
      let zeroCount = 0
      for (let binary of input) {
        if (binary[i] === "0") zeroCount++
      }
      gBinary[i] = input.length - zeroCount >= zeroCount ? 1 : 0
    }
  
    const gamma = parseInt(gBinary.join(""), 2)
    const eBinary = gBinary.map(ele => ele === 0 ? 1 : 0).join("")
    const epsilon = parseInt(eBinary, 2)
  
    return gamma * epsilon
}
  
console.log(multiplyGammaEpsilon(input))
// 3549854

// part2
// multiply oxygen generator rating by CO2 scrubber rating

// same process but discard numbers not matching bit criteria
// stop when have one number

// oxygen generator bit criteria: find most common value in current bit position and keep numbers with that bit in that position
// if 0 and 1 equal, keep 1 
// CO2 scrubber bit criteria: find least common. if equal keep 0

const countChar = (binaries, idx) => { 
    let ones = 0 
  
    for (const binary of binaries) { 
      if (binary[idx] === '1') ones++
    } 
    return ones >= binaries.length - ones ? '1' : '0'
}; 
  
function multiplyOxygenCO2(input) {
    const bitCount = input[0].length

    let oBinaries = [...input]                  
    let cBinaries = [...input]         

    for (let i = 0; i < bitCount && oBinaries.length > 1; i++) {
        const majority = countChar(oBinaries, i);  
        oBinaries = oBinaries.filter((binary) => binary[i] === majority); 
    } 
        
    for (let i = 0; i < bitCount && cBinaries.length > 1; i++) { 
        const majority = countChar(cBinaries, i);
        cBinaries = cBinaries.filter((binary) => binary[i] !== majority); 
    } 

    const oxygen = parseInt(oBinaries[0], 2); 
    const cO2 = parseInt(cBinaries[0], 2); 

    return oxygen * cO2;
}

console.log(multiplyOxygenCO2(input))
// 3765399

//--------------------------------------------------------
// const binaryToDec = (binary) => {
//   let decimal = 0
//   for (let i = 0; i < binary.length; i++)
//     if (binary[binary.length - (i + 1)] === "1")
//       decimal += 2 ** i

//   return decimal
// }
