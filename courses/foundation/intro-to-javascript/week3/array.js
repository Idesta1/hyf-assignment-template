// Item array removal...
const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

names.splice(1, 1);

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'Katrine', 'Tala']

//When will we be there??
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};
const distance = travelInformation.destinationDistance;
const speed = travelInformation.speed;
const travelTime = distance / speed;

function showTime() {
  const hours = Math.floor(travelTime);
  console.log(hours);
  const minutes = Math.round((travelTime - hours) * 60);
  console.log(minutes);
  return `${hours} hours and ${minutes} minutes`;
}
console.log(showTime()); // 8 hours and 38 minutes

// Series duration of my life...
const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Vikings",
    days: 7,
    hours: 3,
    minutes: 29,
  },
  {
    title: "Good Girls",
    days: 1,
    hours: 11,
    minutes: 0,
  },
];

const averageLifeSpan = 80;
const daysInYear = 365;
const hoursInDay = 24;
const minutesInHour = 60;
const averageLifeSpanInMinutes =
  averageLifeSpan * daysInYear * hoursInDay * minutesInHour;

function logOutSeriesText() {
  seriesDurations.forEach((series) => {
    const seriesDurationInMinutes =
      series.days * hoursInDay * minutesInHour +
      series.hours * minutesInHour +
      series.minutes;
    const percentageOfLife = (
      (seriesDurationInMinutes / averageLifeSpanInMinutes) *
      100
    ).toFixed(3);
    console.log(`${series.title} took ${percentageOfLife}% of my life`);
  });
}

const totalPercentage = seriesDurations.reduce((total, series) => {
  const seriesDurationInMinutes =
    series.days * hoursInDay * minutesInHour +
    series.hours * minutesInHour +
    series.minutes;
  return total + (seriesDurationInMinutes / averageLifeSpanInMinutes) * 100;
}, 0);
console.log(`In total that is ${totalPercentage.toFixed(3)}% of my life`);

logOutSeriesText();
