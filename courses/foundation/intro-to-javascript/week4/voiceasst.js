function getReply(command) {
  const text = {};
  const name = command.slice(16).trim();
  if (command.startsWith("Hello my name is ")) {
    text.name = name;
    text.reply = `Nice to meet you ${
      name.charAt(0).toUpperCase() + name.slice(1)
    }`;
  } else if (command === "What is my name?") {
    text.reply = `Your name is Benjamin!`;
  } else if (command.startsWith("Add")) {
    const item = command.slice(4, command.indexOf("to my todo"));
    text.reply = `${item}added to your todo`;
  } else if (command.startsWith("Remove")) {
    const item = command.slice(7, command.indexOf("from my todo"));
    text.reply = `Removed ${item}from your todo`;
  } else if (command === "What is on my todo?") {
    text.reply = `You have 2 todos- fishing and singing in the shower`;
  } else if (command === "What day is it today?") {
    const date = new Date();
    text.reply = `${date}`;
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
