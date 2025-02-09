// js/auth.js

(function () {
  // ---------------------------
  // Points Persistence Helpers
  // ---------------------------
  function getCurrentPoints() {
    return parseInt(localStorage.getItem("currentPoints"), 10) || 1000;
  }

  function setCurrentPoints(points) {
    localStorage.setItem("currentPoints", points);
  }

  let currentPoints = getCurrentPoints();

  /* -------------------------------------
     Rewards Functions
  ------------------------------------- */
  function updatePointsDisplay() {
    const pointsElement = document.getElementById("pointsValue");
    if (pointsElement) {
      pointsElement.innerText = currentPoints;
    }
    updateProgressBar();
  }

  // New: Dynamic progress bar updater
  function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      const threshold = 1000; // Set threshold for demonstration
      let progressPercentage = Math.min((currentPoints / threshold) * 100, 100);
      progressBar.style.width = progressPercentage + '%';
      progressBar.innerText = currentPoints + ' pts';
    }
  }

  function earnPoints() {
    currentPoints += 100;
    setCurrentPoints(currentPoints);
    updatePointsDisplay();
    alert("You earned 100 points!");
    console.log("Points increased. Current points:", currentPoints);
  }

  function redeemReward(event) {
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
      alert("Congratulations! You have redeemed: " + rewardName);
      console.log(`Redeemed "${rewardName}". Points remaining:`, currentPoints);
    } else {
      alert("Insufficient points to redeem " + rewardName + ".");
      console.log("Redemption failed for:", rewardName);
    }
  }

  /* -------------------------------------
     Login Authentication Functions
  ------------------------------------- */
  function validateLogin(event) {
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
      console.log("Login failed: invalid credentials.");
    }
  }

  function checkFormInputs() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signInBtn = document.getElementById("signInBtn");

    if (emailInput && passwordInput && signInBtn) {
      signInBtn.disabled =
        emailInput.value.trim() === "" || passwordInput.value.trim() === "";
    }
  }

  /* -------------------------------------
     Additional Interaction Functions
  ------------------------------------- */
  function trackDay() {
    alert("Your day has been tracked!");
    console.log("Track day button clicked.");
  }

  /* -------------------------------------
     Event Listener Attachments
  ------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    // Update points display (and progress bar) on load
    updatePointsDisplay();

    // Login Form (index.html)
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

    // Track Day Button (home.html)
    const trackDaysBtn = document.getElementById("trackDaysBtn");
    if (trackDaysBtn) {
      trackDaysBtn.addEventListener("click", trackDay);
    }

    // Earn Points Button (rewards.html)
    const earnPointsBtn = document.getElementById("earnPointsBtn");
    if (earnPointsBtn) {
      earnPointsBtn.addEventListener("click", earnPoints);
    }

    // Reward Redemption Buttons (rewards.html)
    const redeemButtons = document.querySelectorAll(".redeem-btn");
    if (redeemButtons.length > 0) {
      redeemButtons.forEach((button) => {
        button.addEventListener("click", redeemReward);
      });
    }
  });
})();
