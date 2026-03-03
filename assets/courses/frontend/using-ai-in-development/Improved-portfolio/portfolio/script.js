document.addEventListener("DOMContentLoaded", () => {
  let themeButton = document.querySelector(".theme-btn");
  let contactButton = document.querySelector(".contact-btn");

  if (themeButton) {
    console.log("Theme button found and ready to listen."); // Debugging log
    themeButton.addEventListener("click", () => {
      let body = document.querySelector("body");
      body.classList.toggle("pink");
    });
  } else {
    console.error("Theme button not found");
  }

  if (contactButton) {
    contactButton.addEventListener("click", contactId);
  } else {
    console.error("Contact button not found");
  }

  // JavaScript for hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Ensure images and layout adjust dynamically
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
    }
  });

  // Update year dynamically
  document.getElementById("year").textContent = new Date().getFullYear();
});

function contactId() {
  let name = prompt("What is your full name?");
  let email = prompt("What is your email address?");

  if (!name || name.trim().length === 0) {
    alert("Name cannot be empty.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  name = name.charAt(0).toUpperCase() + name.slice(1);

  let h1 = document.querySelector("h1");
  if (h1) {
    h1.textContent = `Thank you for contacting me, ${name}. I will get back to you shortly.`;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
