// Hogwarts house generator
// create an h1,label,input,button and p element using createElement.
// used append instead of appendChild to make my code compact and add multiple items at once.
// added style
const h1Element = document.createElement("h1");
const labelElement = document.createElement("label");
const inputElement = document.createElement("input");
const button = document.createElement("button");
const para = document.createElement("p");

h1Element.textContent = "Hogwarts House generator";
labelElement.textContent = "Username:";

inputElement.id = "name-input";
inputElement.type = "text";
inputElement.placeholder = "Enter your name..";

button.textContent = "Submit";
button.style.marginLeft = "10px";
button.style.backgroundColor = "lightgreen";
button.id = "my-button";

para.id = "myP";

document.body.append(h1Element, labelElement, inputElement, button, para);

//assigning variables and functions

let username;
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

button.onclick = function () {
  username = document.getElementById("name-input").value;
  shuffle(houses);

  let message = `${username} belongs in House of, ${houses[0]}!`;
  document.getElementById("myP").textContent = message;
};
