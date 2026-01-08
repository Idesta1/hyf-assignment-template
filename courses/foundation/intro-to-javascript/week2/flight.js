//Flight booking fullname function
function getFullName(firstName, surName, useFormalName, gender) {
  const formalName1 = "Lord";
  const formalName2 = "Madam";
  const fullName = firstName + " " + surName;
  if (useFormalName === true && gender === "man") {
    return formalName1 + " " + fullName;
  } else if (useFormalName === true && gender === "woman") {
    return formalName2 + " " + fullName;
  } else {
    return fullName;
  }
}

const fullName1 = "Sam";
const fullName2 = "David";

console.log(getFullName("Benjamin", "Hughes", true, "man"));
console.log(getFullName("Sarah", "Johnson", false, "woman"));
console.log(getFullName("Dina", "Smith", true, "woman"));

console.log(getFullName(fullName1, fullName2));

//Formal fullname
//to add formal name i  added useFormalName another parameter and used if else condition and added boolean value to check if true to add formal name if false then just fullname.
// i declared two variables formalName1 and formalName2 to store "Lord" and "Madam".
//i called the function twice with different values to check if it works correctly.
// to add gender options i added another parameter gender and used if else condition with "man" and "woman".
