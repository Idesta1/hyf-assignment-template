function getReply(command) {
  const todos = [];

  if (command.startsWith("Hello my name is ")) {
    const name = command.slice("Hello my name is ".length).trim();
    return `Nice to meet you ${name.charAt(0).toUpperCase() + name.slice(1)}`;
  }
  if (command === "What is my name?") {
    return `Your name is Benjamin!`;
  }
  if (command.startsWith("Add")) {
    const item = command.slice(4, command.indexOf("to my todo")).trim();
    todos.push(item);
    return `${item} added to your todo`;
  }
  if (command.startsWith("Remove ")) {
    const item = command.slice(7, command.indexOf(" from my todo")).trim();
    return `Removed ${item} from your todo`;
  }
  if (command === "What is on my todo?" && todos.length >= 0) {
    return `You have ${todos.length} todos`;
  }
  if (command === "What day is it today?") {
    const date = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `Today it is ${date}`;
  }
  if (command.startsWith("What is ")) {
    const expression = command.slice(8).trim(); //added trim to remove extra spaces
    try {
      const result = Function(`'use strict'; return(${expression})`)();
      return `The answer is ${result}`;
    } catch (e) {
      return "Sorry, I can't compute that";
    }
  }

  if (command.toLowerCase().startsWith("set a timer for ")) {
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
    } else {
      return "Invalid time unit specified";
    }
    setTimeout(() => {
      console.log("Timer done");
    }, milliseconds);
    return `Timer set for ${duration} ${unit}`;
  }

  return;
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is       + 3"));
console.log(getReply("set a timer for 4 minutes"));
