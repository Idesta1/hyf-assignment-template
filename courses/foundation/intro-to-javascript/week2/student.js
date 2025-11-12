const class07Students = ["Sam", "John", "Ben", "Rob", "Nancy", "Nova"];
//total

function addStudentToClass(studentName) {
  // can not add more than 6 students
  if (class07Students.length > 6) {
    console.log("Cannot add more students to class 07");
  }
  //student already exists
  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
  }

  //exceptional rule only for the Queen

  if (studentName === "QueenMary") {
    class07Students.push(studentName);
    console.log("The Queen has to be added");
  }

  // can not add empty string
  if (!studentName) {
    console.log("Cannot add empty string");
  }
}

addStudentToClass("Susan");
addStudentToClass("John");
addStudentToClass("QueenMary");
addStudentToClass("");

// to add more students
function getNumberOfStudents(studentName) {
  class07Students.push(studentName);
  console.log(`Add ${studentName} to the class`);
}
// get total of students
const total = class07Students.length;
console.log(total);
getNumberOfStudents("Jared");
getNumberOfStudents("Lisa");
getNumberOfStudents("Gelila");
getNumberOfStudents("Sam");
getNumberOfStudents("QueenMary");
getNumberOfStudents(total);
