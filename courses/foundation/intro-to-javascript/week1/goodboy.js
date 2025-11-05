let dogYearOfBirth = 2020;
let dogYearFuture = 2025;
let dogYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;

if (shouldShowResultInDogYears) {
  let dogYearsEquivalent = dogYear * 7;
  console.log(
    "Your dog will be " +
      dogYearsEquivalent +
      "dog years old in " +
      dogYearFuture
  );
} else {
  console.log(
    "Your dog will be " + dogYear + " human years old in " + dogYearFuture
  );
}
