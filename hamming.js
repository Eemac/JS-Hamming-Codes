//A program to calculate, add noise to, and decode 7,4 hamming codes
//NOTE: there is an error in the decode matrix, so this code will not work properly.
//Binary input string of length 4
let i = 0b0101;

//ENCODE (message * Generator matrix)
let codeword = 0x00;
codeword |= i << 3; //Identity matrix
codeword |= (i&0x01 ^ (i&0x04) >> 2 ^ (i&0x08) >> 3) << 2; //Parity bit 1
codeword |= (i&0x01 ^ (i&0x02) >> 1 ^ (i&0x08) >> 3) << 1; //Parity bit 2
codeword |= (i&0x01 ^ (i&0x02) >> 1 ^ (i&0x04) >> 2) << 0; //Parity bit 3

//Log codeword
console.log("Hamming Codeword Output:" + dec2bin(codeword));

//DECODE SYNDROME (codeword * H)
let syn = 0x00;
syn |= ((codeword&0x40) >> 6 ^ (codeword&0x20) >> 5 ^ (codeword&0x08) >> 3  ^ (codeword&0x04) >> 2) << 2; //Syndrome bit 1
syn |= ((codeword&0x40) >> 6 ^ (codeword&0x10) >> 4 ^ (codeword&0x08) >> 3  ^ (codeword&0x02) >> 1) << 1; //Syndrome bit 2
syn |= ((codeword&0x20) >> 5 ^ (codeword&0x10) >> 4 ^ (codeword&0x08) >> 3  ^ (codeword&0x01) >> 0) << 0; //Syndrome bit 3

//Error correcting (flip bit position if there is an error)
codeword = codeword ^ 1 << (6 - (syn - 1));
console.log("Noisy Codeword" + dec2bin(codeword));

//Output original message
codeword = codeword >> 3;
console.log(dec2bin(codeword));

//Convert number to binary string
function dec2bin(dec) {return (dec >>> 0).toString(2);}

