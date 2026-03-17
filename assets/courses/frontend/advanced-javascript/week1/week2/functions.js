// Function that logs a string after a specified delay in seconds
function delayLogOut(delay, stringToLog) {
  setTimeout(() => {
    console.log(stringToLog);
  }, delay * 1000);
}

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  delayLogOut(5, "This string logged after 5 seconds");
});

// console.log(delayLogOut(2.5, "This string logged after 2.5 seconds"));
// console.log(delayLogOut(5, "This string logged after 5 seconds"));

function earthLogger() {}

function saturnLogger() {}

function planetLogFunction(logger) {
  logger();
}

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);

function geolocationLogger() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
}

geolocationLogger();

const button = document.getElementById("location-btn");
const longitude = document.getElementById("longitude-input");
const latitude = document.getElementById("latitude-input");

button.addEventListener("click", geolocationLogger);

navigator.geolocation.getCurrentPosition((position) => {
  latitude.textContent = `This is the Latitude: ${position.coords.latitude}`;
  longitude.textContent = `This is the Longitude: ${position.coords.longitude}`;
});

function runAfterDelay(delay, callback) {
  setTimeout(() => {
    callback();
  }, delay * 1000);
}

runAfterDelay(4, () => {
  console.log("This string logged after 4 seconds");
});

function doubleClickDetector(element) {
  let clickCount = 0;
  element.addEventListener("click", () => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 2) {
        console.log("Double click detected!");
      }
      clickCount = 0;
    }, 300);
  });
}

const clickElement = document.getElementById("click-element");
doubleClickDetector(clickElement);

function jokeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
  if (shouldTellFunnyJoke === true) {
    logFunnyJoke();
  } else {
    logBadJoke();
  }
}

function logFunnyJoke() {
  console.log(
    "Why don't scientists trust atoms? Because they make up everything!",
  );
}

function logBadJoke() {
  console.log(
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
  );
}

console.log(jokeCreator(true, logFunnyJoke, logBadJoke));
console.log(jokeCreator(false, logFunnyJoke, logBadJoke));
