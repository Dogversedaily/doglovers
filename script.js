// Replace this with your real OGAds locker link:
const LOCKER_URL = "YOUR_OGADS_LOCKER_URL_HERE";

function openLocker() {
  window.location.href = LOCKER_URL;
}

// Dynamic year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
