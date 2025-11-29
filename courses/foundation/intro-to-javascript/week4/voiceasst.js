const user = {}; // store a user's name and array of names provided through commands.
const todos = [];
function getReply(argument) {
  if (!argument || !argument.trim()) return `Please provide a command.`; //if argument is empty or whitespace
  const command = argument.toLowerCase(); //converts input command to lowercase to make it case insensitive

  if (command.startsWith("hello my name is ")) {
    const name = argument.slice(17).trim().split(" "); //retrieves the name part starting from the 17th character
    user.name = name
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1)) //capitalizing the first letter and then joining them back into a single string
      .join(" ");

    const nameArray = []; // loops through name and creates an array of unique names , storing it in user.nameArray
    for (let i = 0; i < name.length; i++) {
      if (!nameArray.includes(name[i])) {
        nameArray.push(name[i]);
      }
    }
    user.nameArray = nameArray;
    return `Nice to meet you ${user.name}`;
  } else if (command === "what is my name?") {
    // checks  if the user's name is stored
    if (user.name) {
      return `Your name is ${user.name}`; //if name exists it returns name
    } else {
      return `I don't know your name yet.`; //if name does not exist
    }
  } else if (command.startsWith("add ")) {
    const item = argument.slice(4, command.indexOf(" to my todo")).trim();
    todos.push(item);
    return `${item} added to your todo`;
  } else if (command.startsWith("remove ")) {
    const item = argument.slice(7, command.indexOf(" from my todo")).trim();
    const index = todos.indexOf(item);
    if (index > -1) {
      todos.splice(index, 1);
      return `${item} removed from your todo`;
    } else {
      return `${item} is not in your todo`;
    }
  } else if (command === "what is on my todo?") {
    if (todos.length === 0) {
      return `Your todo is empty.`;
    } else {
      return `You have ${todos.length} todos - ${todos.join(", ")}`;
    }
  } else if (command === "what day is it today?") {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return `Today is ${today.toLocaleDateString("en-US", options)}`;
  } else if (command.startsWith("what is ")) {
    const expression = argument.slice(8).trim();
    try {
      const result = Function(`"use strict"; return (${expression})`)();
      return `The answer is ${result}`;
    } catch (error) {
      return `I cannot compute that expression.`;
    }
  } else if (command.startsWith("set a timer for ")) {
    const timePart = command.slice(16);
    const timeComponents = timePart.split(" ");
    const duration = parseInt(timeComponents[0]);
    const unit = timeComponents[1];
    let milliseconds = 0;
    if (unit === "seconds") {
      milliseconds = duration * 1000;
    } else if (unit === "minutes") {
      milliseconds = duration * 60 * 1000;
    } else if (unit === "hours") {
      milliseconds = duration * 60 * 60 * 1000;
    }
    setTimeout(() => {
      console.log("Timer done");
    }, milliseconds);
    return `Timer set for ${duration} ${unit}`;
  } else {
    return `Please specify a valid time unit (seconds, minutes, hours).`;
  }
}

console.log(getReply("hello my name is Benjamin L Smith"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is       + 3"));
console.log(getReply("set a timer for 4 minutes"));
console.log(getReply("Add dancing to my todo"));
console.log(getReply("Add hiking to my todo"));
console.log(getReply("What is 3 * 3"));
console.log(getReply("what is 6 / 2"));
console.log(getReply("what is 6-2"));
