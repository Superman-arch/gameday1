"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const indexForm = document.getElementById("indexForm");
  if (indexForm) {
    indexForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const errorMsg = document.getElementById("errorMsg");
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      if (email === "deca@gmail.com" && password === "deca") {
        window.location.href = "home.html";
      } else {
        errorMsg.textContent = "Invalid email or password. Please try again.";
        console.warn("Login failed: invalid credentials.");
      }
    });
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    if (emailInput && passwordInput) {
      const checkFormInputs = () => {
        const signInBtn = document.getElementById("signInBtn");
        if (signInBtn) {
          signInBtn.disabled = emailInput.value.trim() === "" || passwordInput.value.trim() === "";
        }
      };
      emailInput.addEventListener("input", checkFormInputs);
      passwordInput.addEventListener("input", checkFormInputs);
    }
  }
});
