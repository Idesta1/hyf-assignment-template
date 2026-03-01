// A function that compares three numbers and returns the sum of the positive ones.

function sumPositiveNumbers(a, b, c) {
  // Use an array to simplify the logic
  return [a, b, c].filter((num) => num > 0).reduce((sum, num) => sum + num, 0);
}

function main() {
  console.log("--- sumPositiveNumbers ---");
  console.log(sumPositiveNumbers(1, 2, 3)); // 6
  console.log(sumPositiveNumbers(-1, 2, 3)); // 5
  console.log(sumPositiveNumbers(-1, -2, 3)); // 3
  console.log(sumPositiveNumbers(-1, -2, -3)); // 0
}

main();

export { sumPositiveNumbers };
