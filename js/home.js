"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const trackDaysBtn = document.getElementById("trackDaysBtn");
  if (trackDaysBtn) {
    trackDaysBtn.addEventListener("click", () => {
      alert("Your day has been tracked!");
      console.info("Track day button clicked.");
    });
  }
});
