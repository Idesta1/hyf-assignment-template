//peter's estimate

const peterWidth = 8;
const peterDepth = 10;
const peterHeight = 10;

const peterGardenSizeInM2 = 100;
const peterHouseCosts = 25000000;
const peterVolumeInMeters = peterWidth * peterDepth * peterHeight;
const peterHousePrice =
  peterVolumeInMeters * 2.5 * 1000 + peterGardenSizeInM2 * 300;

if (peterHouseCosts > peterHousePrice) {
  console.log("You are paying more");
} else if (peterHouseCosts < peterHousePrice) {
  console.log("You are paying less");
} else {
  console.log("You are paying fair!");
}

//Julia's estimate

const juliaWidth = 5;
const juliaDepth = 8;
const juliaHeight = 11;

const juliaGardenSizeInM2 = 100;
const juliaHouseCosts = 2000000;
const juliaVolumeInMeters = juliaWidth * juliaDepth * juliaHeight;
const juliaHousePrice =
  juliaVolumeInMeters * 2.5 * 1000 + juliaGardenSizeInM2 * 300;

if (juliaHouseCosts > juliaHousePrice) {
  console.log("You are paying more");
} else if (juliaHouseCosts < juliaHousePrice) {
  console.log("You are paying less");
} else {
  console.log("You have paid fair!");
}
