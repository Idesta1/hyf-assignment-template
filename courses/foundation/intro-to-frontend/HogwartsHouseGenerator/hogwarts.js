const houses = [
  {
    name: "Gryffindor",
    description:
      "Gryffindor values courage, bravery, nerve and chivalry. Its mascot is the lion, and its colours are scarlet and gold. The Gryffindor motto is Their daring, nerve and chivalry set Gryffindors apart. The Head of this house is the Transfiguration teacher and Deputy Headmistress, Minerva McGonagall, and the house ghost is Sir Nicholas de Mimsy-Porpington, more commonly known as Nearly Headless Nick. According to Rowling, Gryffindor corresponds roughly to the element of fire. The founder of the house is Godric Gryffindhighest towers, the entrance to which is located on the seventh floor in the east wing of the castle and is guarded by a painting of The Fat Lady, who is garbed in a pink dress. She permits entry only after being given the correct password, as was distinguished in the third book, when Sirius Black tried forcing entry into the tower, only to be blocked by The Fat Lady after he could not give the correct password. In the first book, Neville Longbottom tends to forget the password and must wait near the painting until other Gryffindors arrive to open the way.",
    image:
      "https://harrypottercrazies.weebly.com/uploads/1/8/4/4/18445957/4778832.jpg",
  },
  {
    name: "Hufflepuff",
    description:
      "Hufflepuff house values hard work, patience, justice, and loyalty. The house mascot is the badger, and the house colours are yellow and black. The Hufflepuff motto is Those patient Hufflepuffs are true and unafraid of toil. The head of this house is the Herbology professor, Pomona Sprout, and the house ghost is the Fat Friar. According to Rowling, Hufflepuff corresponds roughly to the element of earth. The founder of this house is Helga Hufflepuff. The Hufflepuff dormitories and common room are located near the castle kitchens, in a cozy nook that can be reached through a stack of large barrels in a nook near the kitchens. The entrance is concealed by a large barrel; to gain entry, one must tap the barrel in a certain rhythm (which changes from time to time) to open it up. The common room is a vast underground cavern with earthy tones, low ceilings, and numerous plants and fungi growing from the walls. There are many cozy chairs and sofas around small fireplaces, as well as low tables for studying and socializing.",
    image:
      "https://harrypottercrazies.weebly.com/uploads/1/8/4/4/18445957/3077859.jpg?303",
  },
  {
    name: "Ravenclaw",
    description:
      'Ravenclaw values intelligence, creativity, learning, and wit. The house mascot is an eagle and the house colours are blue and bronze blue and grey in the films. The Ravenclaw motto is "Wit beyond measure is man\'s greatest treasure." The head of this house is the Charms professor, Filius Flitwick, and the house ghost is The Grey Lady. According to Rowling, Ravenclaw corresponds roughly to the element of air. The founder of this house is Rowena Ravenclaw. The dormitories are located in Ravenclaw Tower, on the west side of Hogwarts. The common room, which went undescribed in the series until the climax of Deathly Hallows, is round and filled with blue hangings and armchairs, has a domed ceiling painted with stars and features a replica statue of Rowena wearing her diadem. Harry also notes that Ravenclaws "have a spectacular view of the surrounding mountains"',
    image:
      "https://harrypottercrazies.weebly.com/uploads/1/8/4/4/18445957/1177755.jpg?264",
  },
  {
    name: "Slytherin",
    description:
      "Slytherin house values ambition, cunning, leadership, and resourcefulness; the Sorting Hat said in Harry Potter and the Philosopher's Stone that Slytherins will do anything to get their way. The house mascot of Slytherin is the serpent, and the house colours are green and silver. The Slytherin motto is Slytherin will help you on your way to greatness. Salazar Slytherin founded the house. The Head of House is Severus Snape until near the end of the sixth book. Then, Horace Slughorn, the previous Head of House, comes out of retirement re-assuming authority. The ghost of Slytherin house is The Bloody Baron. According to Rowling, Slytherin corresponds roughly to the element of water. The Slytherin dormitories and common room are reached through a bare stone wall in the dungeons. The Slytherin common room is a long, low, dungeon-style room, located under the Hogwarts Lake, furnished with green lamps and carved armchairs. The room is described in the second book as having a greenish glow.",
    image:
      "https://harrypottercrazies.weebly.com/uploads/1/8/4/4/18445957/987119.jpg?250",
  },
];

const usernameInput = document.getElementById("username");
const getHouseBtn = document.getElementById("getHouseBtn");
const retryBtn = document.getElementById("retryBtn");
const houseResult = document.getElementById("houseResult");
const houseName = document.getElementById("houseName");
const houseDescription = document.getElementById("houseDescription");
const houseImage = document.getElementById("houseImage");

let lastHouseIndex = -1; // Track the last selected house index

function getRandomHouse() {
  const username = usernameInput.value.trim();
  if (username === "") {
    houseResult.textContent = "Please enter your name to get sorted!";
    houseResult.classList.remove("hidden");
    return;
  }

  // Generate a new random index that is not the same as the last one
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * houses.length);
  } while (randomIndex === lastHouseIndex);
  lastHouseIndex = randomIndex; // Update last index

  const house = houses[randomIndex];

  houseName.textContent = `You belong in ${house.name}!`;
  houseDescription.textContent = house.description;
  houseImage.src = house.image;

  houseResult.textContent = `${username} belongs in ${house.name}!`;
  houseResult.classList.remove("error", "hidden");

  // Change button text after first click
  if (getHouseBtn.textContent === "Get a House") {
    getHouseBtn.textContent = "Assign New House";
  }
  retryBtn.classList.remove("hidden");
}

getHouseBtn.addEventListener("click", getRandomHouse);
retryBtn.addEventListener("click", getRandomHouse);
