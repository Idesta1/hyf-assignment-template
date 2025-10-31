document.addEventListener("DOMContentLoaded", () => {
  let themeButton = document.querySelector(".theme-btn");

  if (themeButton) {
    themeButton.addEventListener("click", changeTheme);
  } else {
    console.error("Theme button not found");
  }

  function changeTheme() {
    let body = document.querySelector("body");

    if (body.classList.contains("pink")) {
      body.classList.remove("pink");
    } else {
      body.classList.add("pink");
    }
  }
});

function contactId() {
  let name = prompt("What is your full name?");
  let email = prompt("What is your email address?");

  if (name.length > 0) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  let h1 = document.querySelector("h1");
  h1.innerHTML =
    "Thank you for contacting me, " + name + " I will get back to you shortly.";
}

document.addEventListener("DOMContentLoaded", function () {
  let contactButton = document.querySelector(".contact-btn");
  contactButton.addEventListener("click", contactId);
});
