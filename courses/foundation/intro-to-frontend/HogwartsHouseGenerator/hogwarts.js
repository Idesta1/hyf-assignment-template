const houses = [
  {
    name: "Gryffindor",
    description: "Valued bravery, daring, nerve, and chivalry.",
    image: "https://picsum.photos/400/250?random=4",
  },
  {
    name: "Hufflepuff",
    description:
      "Valued hard work, dedication, patience, loyalty, and fair play.",
    image: "https://picsum.photos/400/250?random=1",
  },
  {
    name: "Ravenclaw",
    description:
      "Valued intelligence, knowledge, curiosity, creativity and wit.",
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    name: "Slytherin",
    description:
      "Valued ambition, leadership, self-preservation, cunning and resourcefulness.",
    image: "https://picsum.photos/400/250?random=3",
  },
];

//DOM elements
const usernameInput = document.getElementById("username");
const getHouseBtn = document.getElementById("getHouseBtn");
const retryBtn = document.getElementById("retryBtn");
const houseResult = document.getElementById("houseResult");
const houseName = document.getElementById("houseName");
const houseDescription = document.getElementById("houseDescription");
const houseImage = document.getElementById("houseImage");

// Function to get a random house with condition if name not provided
function getRandomHouse() {
  const username = usernameInput.value.trim();
  if (username === "") {
    houseResult.textContent = "Please enter your name to get sorted!";
    houseResult.classList.remove("hidden");
    return;
  }

  const randomIndex = Math.floor(Math.random() * houses.length);
  const house = houses[randomIndex];

  //update house
  houseName.textContent = `You belong in ${house.name}!`;
  houseDescription.textContent = house.description;
  houseImage.src = house.image;

  //update results
  houseResult.textContent = `${username} belongs in ${house.name}!`;
  houseResult.classList.remove("error hidden");
  retryBtn.classList.remove("hidden");
}

// Event listener for Get House button
getHouseBtn.addEventListener("click", getRandomHouse);
retryBtn.addEventListener("click", getRandomHouse);
