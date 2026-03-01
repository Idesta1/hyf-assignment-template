// String formatting utilities

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function titleCase(sentence) {
  if (!sentence) return "";
  return sentence
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

function main() {
  console.log("--- capitalize ---");
  console.log(capitalize("hello"));
  console.log(capitalize("WORLD"));
  console.log(capitalize("javaScript"));

  console.log("--- titleCase ---");
  console.log(titleCase("hello world")); // Hello World
  console.log(titleCase("javaScript is fun")); // Javascript Is Fun
  console.log(titleCase("MAKE THIS TITLE CASE")); // Make This Title Case
}

main();

export { capitalize };
