// transmission sent using Bouyancy Interchange Transmission System > method packing numeric expression into binary
// sub's computer saved this in hexadecimal

// first step is convert hexadecimal into binary:
    // each char of hexadecimal corresponds to 4 bits of binary data

    const hexToBin = {              // (will need later) 
        0: "0000",
        1: "0001",
        2: "0010",
        3: "0011",
        4: "0100",
        5: "0101",
        6: "0110",
        7: "0111",
        8: "1000",
        9: "1001",
        A: "1010",
        B: "1011",
        C: "1100",
        D: "1101",
        E: "1110",
        F: "1111"
    }

// transmission contains single packet in outermost layer which itself contains many other packets
// hexadecimal representation of this might encode few extra '0' bits at end that you can ignore

// each packet begins with standard header
    // first 3 bits encode packet 'version' (number)
    // next 3 bits encode packet 'typeID' (number)
    // all numbers encoded in packet represented as binary with most significant bit first

// packets with typeID = 4 represent literal value
    // literal value packets encode a single binary number
    // to do this, binary number padded with leading '0' until its length is multiple of 4 bits then it is broken into groups of 4 bits
    // each group prefixed by '1' bit except last group which is prefixed by '0' bit

    // e.g. DTFE28 => 110100101111111000101000
                   // VVVTTTAAAAABBBBBCCCCC             // note: ignore trailing 0
                   //  6  4  0111 1110 0101         
                   //        011111100101  => 2021      // bin => dec

// packet with typeID != 4 represent operator that performs some calculation on one or more subpackets contained within
    // focus on parsing hierarchy of subpackets

    // operator packet contains 1 or more packets
    // to indicate whcih subsequent binary data represents its subpackets, operator packet can use one of two indicated by bit immediately after packet header
    // this is called 'lengthTypeID'
        // if lengthTypeId === 0, next 15 bits are number that represents total length (in bits) of subpackets contained in packet
        // if lengthTypeId === 1, next 11 bits are number that represents # subpackets immediately contained by this packet

        // after lengthTypeId and 15-bit/11-bit, subpackets finally appear
                         //    3   3  1       15            11             16
    // e.g. 38006F45291200 => 001 110 0 000000000011011 11010001010 01010010001001000000000
                         //   VVV TTT I LLLLLLLLLLLLLLL AAAAAAAAAAA BBBBBBBBBBBBBBBB
                         //    1   6  0       27        literal 10     literal 20                                        === (11 + 16)
                         //    v  tI  lT  length subp.  first subp.   second subp           // stop parsing bc have reached length subp value

        //  EE00D40C823060 => 111 011 1 00000000011 01010000001 10010000010 0011000001100000
                         //   VVV TTT I LLLLLLLLLLL AAAAAAAAAAA BBBBBBBBBBB CCCCCCCCCCC     
                         //    7   3  1      3       literal 1   literal 2   literal 3      // stop parsing bc have read 3 subpackets

                            // lT = 11-bit number => contains # subpackets (= 3) 

// part1: parse hierarchy of packets throughout transmission & add all version numbers

const fs = require('fs');

const input = fs.readFileSync('day16.txt', 'utf8')
                .split('')
                .map(char => hexToBin[char].split('')).flat()

const parseVersionAndTypeId = (idx, input) => {
  return [parseInt(input.slice(idx, idx+3).join(''), 2), parseInt(input.slice(idx + 3, idx + 6).join(''), 2)]
}

const sliceInput = (idx, input) => {
  const slices = [];
  
  let slice = input.slice(idx, idx + 5).join('')

  while (slice[0] !== '0') {
    slices.push(slice)
    idx += 5
    slice = input.slice(idx, idx + 5)
  }
  slices.push(slice)

  return slices
}

function parsePackets(input) {
  let idx = 0
  let sum = 0

  while (idx < input.length) {
    const [version, typeId] = parseVersionAndTypeId(idx, input)
    idx += 6
    sum += version

    if (typeId === 4) {
      const slices = sliceInput(idx, input)
      idx += slices.length * 5
    } else {
      const lengthTypeId = input[idx++]  
      const subLength = lengthTypeId === '0' ? parseInt(input.slice(idx, idx + 15).join(''), 2) : 0
      const subCount = lengthTypeId === '1' ? parseInt(input.slice(idx, idx + 11).join(''), 2) : 0
      idx += lengthTypeId === '0' ? 15 : 11
    }
  }
  return sum
}

console.log(parsePackets(input))
// 913

// part2: calculate value of transmission expression
    
    // typeId 0 === sum subpackets
    // typeId 1 === product packets
    // typeId 2 === Math.min(...packets)
    // typeId 3 === Math.max(...packets)
    // typeId 4 === single number
    // typeId 5 === subpacket[0] > subpacket[1] ? 1 : 0     // always exactly 2 packets
    // typeId 6 === subpacket[0] < subpacket[1] ? 1 : 0
    // typeId 7 === subpacket[0] === subpacket[1] ? 1 : 0
    
                                       
