let volumeInMeters = prompt("what is the volume in meter?");
let gardenSizeInM2 = prompt("what is the garden size in m2?");
let estimateCost = prompt("How much is the estimated cost?");
const housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;

if (housePrice > estimateCost) {
  alert("Good deal paying too little");
} else if (housePrice < estimateCost) {
  alert("paying too much");
} else {
  alert("its the right price");
}
