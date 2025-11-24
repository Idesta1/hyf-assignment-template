function getReply(command) {
  const text = {};
  const name = command.slice(16).trim();
  if (command.startsWith("Hello my name is ")) {
    text.name = name;
    text.reply = `Nice to meet you ${
      name.charAt(0).toUpperCase() + name.slice(1)
    }`;
  } else if (command === "What is my name?") {
    text.reply = `Your name is ${text.name}!`;
  }
  return text.reply;
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name?"));
