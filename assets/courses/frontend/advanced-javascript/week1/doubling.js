let numbers = [1, 2, 3, 4];
let newNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) {
    newNumbers[i] = numbers[i] * 2;
  }
}

console.log("The doubled numbers are", newNumbers); // [2, 6]

// using map to double only the odd numbers,

const doubledArray = numbers.map((number) => {
  if (number % 2 !== 0) {
    return number * 2;
  }
  return number;
});
console.log(doubledArray);

// filter odd numbers using arrow function
const filtered = numbers.filter((number) => {
  return number % 2 !== 0;
});
console.log(filtered);

// Filtered and doubled chaining
const filteredAndDoubled = numbers
  .filter((number) => number % 2 !== 0)
  .map((number) => number * 2);

console.log(filteredAndDoubled);
