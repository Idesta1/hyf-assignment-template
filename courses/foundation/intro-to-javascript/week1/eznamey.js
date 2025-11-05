let firstWords = [
  "meta",
  "tech",
  "awesome",
  "Easy",
  "solution",
  "Happy",
  "solve",
  "world",
  "Best",
  "terminal",
];
let secondWords = [
  "lab",
  "bbq",
  "geek",
  "norse",
  "buddy",
  "dog",
  "memo",
  "star",
  "space",
  "c",
];

const randomNumber = Math.floor(Math.random() * 10);
const randomFirst = firstWords[Math.floor(Math.random() * 10)];
const randomSecond = secondWords[Math.floor(Math.random() * 10)];

const startupName = `${randomFirst} ${randomSecond}`;

console.log("Your startup name is:", startupName);
