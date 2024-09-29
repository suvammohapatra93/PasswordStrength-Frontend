let pass = document.getElementById("password");
let msg = document.getElementById("message");
let str = document.getElementById("strength");
let suggestion = document.getElementById("suggestion");
let togglePassword = document.getElementById("togglePassword");

const getPasswordStrength = (password) => {
  let strength = 0;
  let suggestions = [];

  // Check for password length
  if (password.length >= 8) {
    strength += 1;
  } else {
    suggestions.push("Increase length to 8 characters or more.");
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    strength += 1;
  } else {
    suggestions.push("Add at least one uppercase letter.");
  }

  // Check for numbers
  if (/[0-9]/.test(password)) {
    strength += 1;
  } else {
    suggestions.push("Include at least one number.");
  }

  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    strength += 1;
  } else {
    suggestions.push(
      "Use at least one special character (e.g., @, #, $, etc.)."
    );
  }

  return { strength, suggestions };
};

pass.addEventListener("input", () => {
  let password = pass.value;
  if (password.length > 0) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
    suggestion.innerHTML = "";
    return;
  }

  let { strength, suggestions } = getPasswordStrength(password);

  // Update strength message and color based on password strength
  if (strength === 1) {
    str.innerHTML = "Very Weak";
    pass.style.borderColor = "#ff5925";
    msg.style.color = "#ff5925";
  } else if (strength === 2) {
    str.innerHTML = "Weak";
    pass.style.borderColor = "#ff8c25";
    msg.style.color = "#ff8c25";
  } else if (strength === 3) {
    str.innerHTML = "Medium";
    pass.style.borderColor = "yellow";
    msg.style.color = "yellow";
  } else if (strength === 4) {
    str.innerHTML = "Strong";
    pass.style.borderColor = "#26d730";
    msg.style.color = "#26d730";
  }

  // Update suggestions for stronger password
  suggestion.innerHTML =
    suggestions.length > 0 ? `Suggestions: ${suggestions.join(", ")}` : "";
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const type = pass.getAttribute("type") === "password" ? "text" : "password";
  pass.setAttribute("type", type);
  togglePassword.innerHTML =
    type === "password"
      ? `<img src="eye-icon.png" alt="Show Password"/>`
      : `<img src="eye-slash-icon.png" alt="Hide Password"/>`;
});
