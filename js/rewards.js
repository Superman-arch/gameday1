"use strict";
// Points Persistence Helpers
const getCurrentPoints = () => parseInt(localStorage.getItem("currentPoints"), 10) || 1000;
const setCurrentPoints = (points) => localStorage.setItem("currentPoints", points);
let currentPoints = getCurrentPoints();

const updatePointsDisplay = () => {
  const pointsElement = document.getElementById("pointsValue");
  if (pointsElement) {
    pointsElement.innerText = currentPoints;
  }
  updateProgressBar();
};

const updateProgressBar = () => {
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const threshold = 1000;
    const progressPercentage = Math.min((currentPoints / threshold) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.innerText = `${currentPoints} pts`;
  }
};

const earnPoints = () => {
  currentPoints += 100;
  setCurrentPoints(currentPoints);
  updatePointsDisplay();
  alert("You earned 100 points!");
  console.info("Points increased. Current points:", currentPoints);
};

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

document.addEventListener("DOMContentLoaded", () => {
  updatePointsDisplay();
  const earnPointsBtn = document.getElementById("earnPointsBtn");
  if (earnPointsBtn) {
    earnPointsBtn.addEventListener("click", earnPoints);
  }
  const redeemButtons = document.querySelectorAll(".redeem-btn");
  if (redeemButtons.length > 0) {
    redeemButtons.forEach((button) => {
      button.addEventListener("click", redeemReward);
    });
  }
});

