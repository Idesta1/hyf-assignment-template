let dogYearOfBirth = 2010;
let dogYearFuture = 2025;
let dogHumanYear = dogYearFuture - dogYearOfBirth;
const shouldShowResultInDogYears = true;
const dogYearsEquivalent = dogHumanYear * 7;

if (shouldShowResultInDogYears) {
  console.log(
    "Your dog will be " +
      dogYearsEquivalent +
      " dog years old in " +
      dogYearFuture
  );
} else if (dogHumanYear) {
  console.log(
    "Your dog will be " + dogHumanYear + " human years old in " + dogYearFuture
  );
}
