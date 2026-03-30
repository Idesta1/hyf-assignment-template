const form = document.querySelector("form");
const urlInput = document.querySelector("#url");
const screenshot = document.querySelector("#screenshot");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = urlInput.value;
  if (url) {
    screenshot.src = `https://storage.linebot.site/screenshothot?url=${url}`;
  }
});
