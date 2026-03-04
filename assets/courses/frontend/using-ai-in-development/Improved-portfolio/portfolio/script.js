document.addEventListener("DOMContentLoaded", () => {
  let themeButton = document.querySelector(".theme-btn");
  let emailButton = document.querySelector(".btn[href^='mailto']");

  if (themeButton) {
    console.log("Theme button found and ready to listen."); // Debugging log
    themeButton.addEventListener("click", () => {
      let body = document.querySelector("body");
      body.classList.toggle("pink");
    });
  } else {
    console.error("Theme button not found");
  }

  if (emailButton) {
    emailButton.addEventListener("click", (event) => {
      event.preventDefault();
      contactId();
    });
  } else {
    console.error("Email button not found");
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
  const existingPopup = document.querySelector(".popup-overlay");
  if (existingPopup) {
    existingPopup.style.display = "block"; // Show the popup if it already exists
    return;
  }

  // Create popup overlay
  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");

  // Create popup container
  const popup = document.createElement("div");
  popup.classList.add("popup-form");

  // Create form
  const form = document.createElement("form");
  form.classList.add("dynamic-contact-form");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  form.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Your Name";
  nameInput.required = true;
  form.appendChild(nameInput);

  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email:";
  form.appendChild(emailLabel);

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Your Email";
  emailInput.required = true;
  form.appendChild(emailInput);

  const messageLabel = document.createElement("label");
  messageLabel.textContent = "Message:";
  form.appendChild(messageLabel);

  const messageInput = document.createElement("textarea");
  messageInput.name = "message";
  messageInput.placeholder = "Your Message";
  messageInput.rows = 4;
  messageInput.required = true;
  form.appendChild(messageInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Send Message";
  submitButton.classList.add("btn");
  form.appendChild(submitButton);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";
  closeButton.classList.add("btn");
  closeButton.style.backgroundColor = "#f44336";
  closeButton.style.color = "#fff";
  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });
  form.appendChild(closeButton);

  popup.appendChild(form);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      alert("Name cannot be empty.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(`Thank you, ${name}. Your message has been sent!`);
    form.reset();
    overlay.style.display = "none";
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
