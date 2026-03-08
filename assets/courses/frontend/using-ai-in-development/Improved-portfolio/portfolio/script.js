document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector(".theme-btn");
  const navLinks = document.querySelector(".nav .links");

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("pink");
    });
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
