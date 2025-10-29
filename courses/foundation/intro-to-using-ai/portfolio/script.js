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
