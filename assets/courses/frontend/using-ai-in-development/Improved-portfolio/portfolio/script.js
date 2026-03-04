document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector(".theme-btn");
  const navLinks = document.querySelector(".nav .links");

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("pink");
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
