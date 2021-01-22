const fs = require('fs')

const input = fs.readFileSync('25.txt','utf8').split(/\n/).map(num => Number(num))

// Cryptographic handshake used by the card and the door involves an operation that transforms a subject number. 
// To transform a subject number, start with the value 1. Then, a number of times called the loop size, perform the following steps:

// Set the value to itself multiplied by the subject number. Then et the value to the remainder after dividing the value by 20201227.
// The card always uses a specific, secret loop size when it transforms a subject number. The door uses a different, secret loop size.

// The cryptographic handshake works like this:

// The card transforms the subject according to the card's secret loop size. The result is called the card's public key.
// The door transforms the subject according to the door's secret loop size. The result is called the door's public key.
// The card and door use the wireless RFID signal to transmit the two public keys (your puzzle input) to the other device. 

// Now, card has door's public key, and door has card's public key. You have both public keys, but neither device's loop size.
// The card transforms the subject number of the door's public key according to the card's loop size. 
// The door transforms the subject number of the card's public key according to the door's loop size. 
// The result for both is the same === encryption key.
// Use the two public keys to determine each device's loop size, you will have enough information to calculate the secret encryption key 
// the card and door use to communicate. You can use either device's loop size with the other device's public key to calculate encryption key. 

// PART ONE: What encryption key is the handshake trying to establish?

function findEncryption(arr) {
  let [card, door] = arr

  let cardLoop = 0
//   let doorLoop = 0
  let cVal = 1
//   let dVal = 1
  let divisor = 20201227

  while (cVal !== card) {
    cVal = cVal * 7 % divisor
    cardLoop++
  }

//   while (dVal !== door) {                        // NOT NECESSARY TO DO BOTH
//     dVal = dVal * 7 % divisor
//     doorLoop++
//   }

  let answer = 1

  for (let i = 0; i < cardLoop; i++){
    answer = answer * door % divisor
  }
 
  return answer
}

console.log(findEncryption(input))                  // PART ONE: 11328376