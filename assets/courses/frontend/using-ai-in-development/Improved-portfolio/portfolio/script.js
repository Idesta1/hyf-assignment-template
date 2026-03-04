document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector(".theme-btn");
  const hamburger = document.querySelector(".nav .hamburger");
  const navLinks = document.querySelector(".nav .links");

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("pink");
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("active");
      }
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
  });

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
