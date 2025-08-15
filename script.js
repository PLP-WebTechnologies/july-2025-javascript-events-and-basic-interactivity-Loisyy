// ================================
// Part 1: Variables & Conditionals
// ================================

// Ask for name and greet user
let userName = prompt("Enter your name:");
if (userName && userName.trim().length > 0) {
  console.log(`Welcome, ${userName}!`);
} else {
  console.log("Hello, guest!");
}

// Check if today is weekend
let today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
if (today === 0 || today === 6) {
  console.log("Enjoy your weekend!");
} else {
  console.log("Have a productive weekday!");
}

// ================================
// Part 2: Functions (Reusable)
// ================================

function changeTitle(newTitle) {
  document.querySelector("header h1").textContent = newTitle;
}

function highlightAllRows(color) {
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach(row => {
    row.style.backgroundColor = color;
  });
}

function toggleCaptions() {
  document.querySelectorAll(".grid-container p").forEach(caption => {
    caption.style.display = caption.style.display === "none" ? "block" : "none";
  });
}

// ================================
// Part 3: Loops
// ================================

const tableRows = document.querySelectorAll("tbody tr");
for (let i = 0; i < tableRows.length; i++) {
  tableRows[i].firstElementChild.textContent = `${i + 1}. ${tableRows[i].firstElementChild.textContent}`;
}

document.querySelectorAll(".nav a").forEach(link => {
  console.log(`Nav link: ${link.textContent}`);
});

// ================================
// Part 4: DOM Interactions
// ================================

// Change header title on click
document.querySelector("header h1").addEventListener("click", () => {
  changeTitle("🚀 Welcome to butterfly world!");
});

// Highlight table rows on hover
tableRows.forEach(row => {
  row.addEventListener("mouseenter", () => row.style.backgroundColor = "#f0f0f0");
  row.addEventListener("mouseleave", () => row.style.backgroundColor = "");
});

// Toggle captions button
const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Captions";
toggleButton.classList.add("mt-20");
document.querySelector(".grid-container").before(toggleButton);
toggleButton.addEventListener("click", toggleCaptions);

// ================================
// Part 5: Light/Dark Mode Toggle
// ================================
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "Toggle Dark Mode";
darkModeBtn.classList.add("mt-20");
document.querySelector("header").appendChild(darkModeBtn);

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ================================
// Part 6: Collapsible Sections
// ================================
document.querySelectorAll(".collapsible").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    content.classList.toggle("show");
  });
});

// ================================
// Part 7: Form Validation
// ================================
const form = document.querySelector("form");

function showError(input, message) {
  input.classList.add("error");
  input.classList.remove("success");
  let errorMsg = input.nextElementSibling;
  if (!errorMsg || !errorMsg.classList.contains("error-message")) {
    errorMsg = document.createElement("div");
    errorMsg.classList.add("error-message");
    input.after(errorMsg);
  }
  errorMsg.textContent = message;
}

function showSuccess(input) {
  input.classList.add("success");
  input.classList.remove("error");
  const errorMsg = input.nextElementSibling;
  if (errorMsg && errorMsg.classList.contains("error-message")) {
    errorMsg.remove();
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = form.querySelector("[name='name']");
  const emailInput = form.querySelector("[name='email']");
  const passwordInput = form.querySelector("[name='password']");

  let isValid = true;

  if (!nameInput.value.trim()) {
    showError(nameInput, "Name is required");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email address");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (passwordInput.value.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    showSuccess(passwordInput);
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
    form.querySelectorAll(".success").forEach(el => el.classList.remove("success"));
  }
});

// Live validation
form.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    if (input.name === "email" && validateEmail(input.value)) {
      showSuccess(input);
    } else if (input.value.trim() !== "") {
      showSuccess(input);
    }
  });
});
