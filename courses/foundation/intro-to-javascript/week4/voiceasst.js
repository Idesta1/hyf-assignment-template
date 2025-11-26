function getReply(command) {
  const text = {};
  const greetingPrefix = "Hello my name is ";
  const todos = [];
  const user_name = "Iglesia";

  if (command.startsWith(greetingPrefix)) {
    const name = command.slice(greetingPrefix.length).trim();
    text.reply = `Nice to meet you ${
      name.charAt(0).toUpperCase() + name.slice(1)
    }`;
  } else if (command === "What is my name?") {
    text.reply = `Your name is ${user_name}!`;
  } else if (command.startsWith("Add")) {
    const item = command.slice(4, command.indexOf("to my todo")).trim();
    todos.push(item);
    text.reply = `${item} added to your todo`;
  } else if (command.startsWith("Remove ")) {
    const item = command.slice(7, command.indexOf(" from my todo")).trim();
    const index = todos.indexOf(item);
    text.reply = `Removed ${item} from your todo`;
  } else if (command === "What is on my todo?" && todos.length >= 0) {
    text.reply = `You have ${todos.length} todos`;
  } else if (command === "What day is it today?") {
    const date = new Date();
    text.reply = `Today it is ${date}`;
  } else if (command.startsWith("What is ")) {
    const expression = command.slice(8);
    try {
      const result = Function(`'use strict'; return(${expression})`)();
      text.reply = `The answer is ${result}`;
    } catch (e) {
      text.reply = "Sorry, I can't compute that";
    }
  } else if (command.startsWith("set a timer for ")) {
    const timePart = command.slice(16);
    const timeComponents = timePart.split(" ");
    const duration = parseInt(timeComponents[0]);
    const unit = timeComponents[1];
    let milliseconds = 0;
    if (unit.startsWith("second")) {
      milliseconds = duration * 1000;
    } else if (unit.startsWith("minute")) {
      milliseconds = duration * 60 * 1000;
    } else if (unit.startsWith("hour")) {
      milliseconds = duration * 60 * 60 * 1000;
    }
    setTimeout(() => {
      console.log("Timer done");
    }, milliseconds);
    text.reply = `Timer set for ${duration} ${unit}`;
  }

  return text.reply;
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 3 + 9"));
console.log(getReply("Set a timer for 4 minutes"));
