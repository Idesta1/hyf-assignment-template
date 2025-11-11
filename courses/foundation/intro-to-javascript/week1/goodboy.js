const yearOfBirth = 2010;
const yearFuture = 2025;
const age = yearFuture - yearOfBirth;
const shouldShowResultInDogYears = true;
const dogYearsEquivalent = age * 7;

if (shouldShowResultInDogYears) {
  console.log(
    "Your dog will be " + dogYearsEquivalent + " dog years old in " + yearFuture
  );
} else if (age) {
  console.log("Your dog will be " + age + " human years old in " + yearFuture);
}
