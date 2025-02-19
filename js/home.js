// js/auth.js
"use strict";

(function () {
  // ---------------------------
  // Points Persistence Helpers
  // ---------------------------
  /**
   * Retrieves the current points from localStorage.
   * @returns {number} The current points (defaulting to 1000 if not set).
   */
  const getCurrentPoints = () => parseInt(localStorage.getItem("currentPoints"), 10) || 1000;

  /**
   * Persists the current points value to localStorage.
   * @param {number} points - The points value to set.
   */
  const setCurrentPoints = (points) => localStorage.setItem("currentPoints", points);

  let currentPoints = getCurrentPoints();

  // -------------------------------------
  // Rewards Functions
  // -------------------------------------

  /**
   * Updates the points display and progress bar.
   */
  const updatePointsDisplay = () => {
    const pointsElement = document.getElementById("pointsValue");
    if (pointsElement) {
      pointsElement.innerText = currentPoints;
    }
    updateProgressBar();
  };

  /**
   * Dynamically updates the progress bar based on current points.
   */
  const updateProgressBar = () => {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      const threshold = 1000; // Threshold for demonstration purposes.
      const progressPercentage = Math.min((currentPoints / threshold) * 100, 100);
      progressBar.style.width = `${progressPercentage}%`;
      progressBar.innerText = `${currentPoints} pts`;
    }
  };

  /**
   * Increases the current points by 100 and updates the display.
   */
  const earnPoints = () => {
    currentPoints += 100;
    setCurrentPoints(currentPoints);
    updatePointsDisplay();
    alert("You earned 100 points!");
    console.info("Points increased. Current points:", currentPoints);
  };

  /**
   * Handles the redemption of a reward.
   * @param {Event} event - The click event from a reward redemption button.
   */
  const redeemReward = (event) => {
    const button = event.currentTarget;
    const cost = parseInt(button.getAttribute("data-cost"), 10);
    const rewardName = button.getAttribute("data-reward");

    if (isNaN(cost)) {
      console.error("Invalid cost for reward:", rewardName);
      return;
    }

    if (currentPoints >= cost) {
      currentPoints -= cost;
      setCurrentPoints(currentPoints);
      updatePointsDisplay();
      alert(`Congratulations! You have redeemed: ${rewardName}`);
      console.info(`Redeemed "${rewardName}". Points remaining:`, currentPoints);
    } else {
      alert(`Insufficient points to redeem ${rewardName}.`);
      console.info("Redemption failed for:", rewardName);
    }
  };

  // -------------------------------------
  // Login Authentication Functions
  // -------------------------------------

  /**
   * Validates login credentials and redirects on success.
   * @param {Event} event - The form submission event.
   */
  const validateLogin = (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    // Simple credentials check (for demonstration purposes)
    if (email === "deca@gmail.com" && password === "deca") {
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = "Invalid email or password. Please try again.";
      console.warn("Login failed: invalid credentials.");
    }
  };

  /**
   * Enables or disables the sign-in button based on input field values.
   */
  const checkFormInputs = () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInBtn = document.getElementById("signInBtn");

    if (emailInput && passwordInput && signInBtn) {
      signInBtn.disabled =
        emailInput.value.trim() === "" || passwordInput.value.trim() === "";
    }
  };

  // -------------------------------------
  // Additional Interaction Functions
  // -------------------------------------

  /**
   * Handles tracking a user's day (demo function).
   */
  const trackDay = () => {
    alert("Your day has been tracked!");
    console.info("Track day button clicked.");
  };

  // -------------------------------------
  // Event Listener Attachments
  // -------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // Update points display (and progress bar) on page load
    updatePointsDisplay();

    // Login Form functionality
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", validateLogin);
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      if (emailInput && passwordInput) {
        emailInput.addEventListener("input", checkFormInputs);
        passwordInput.addEventListener("input", checkFormInputs);
      }
    }

    // Track Day Button (for home.html)
    const trackDaysBtn = document.getElementById("trackDaysBtn");
    if (trackDaysBtn) {
      trackDaysBtn.addEventListener("click", trackDay);
    }

    // Earn Points Button (if present in rewards.html)
    const earnPointsBtn = document.getElementById("earnPointsBtn");
    if (earnPointsBtn) {
      earnPointsBtn.addEventListener("click", earnPoints);
    }

    // Reward Redemption Buttons (for rewards.html)
    const redeemButtons = document.querySelectorAll(".redeem-btn");
    if (redeemButtons.length > 0) {
      redeemButtons.forEach((button) => {
        button.addEventListener("click", redeemReward);
      });
    }
  });
})();
