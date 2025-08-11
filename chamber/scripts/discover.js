import setDefaultElements from "./main.mjs";
import a from "./activities.mjs";

setDefaultElements();
a.getActivities('https://el-luih.github.io/wdd231/chamber/data/activities.json', 'activities-grid');


function getStoredDateAndDifference() {
    let lastDate = localStorage.getItem('lastDate');
    const now = new Date();

    if (!lastDate) {
        localStorage.setItem('lastDate', now.toISOString());
        return 0;
    }

    const storedDate = new Date(lastDate);

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((now - storedDate) / msPerDay);

    return daysPassed;
}

document.addEventListener("DOMContentLoaded", () => {
    let lastDate = localStorage.getItem('lastDate');
    const now = new Date();
    if (!lastDate) {
        showVisitPopup("Welcome! Let us know if you have any questions.");
    } else if (getStoredDateAndDifference() < 1) {
        showVisitPopup("Back so soon! Awesome!");
    } else if (getStoredDateAndDifference() === 1) {
        showVisitPopup("You last visited 1 day ago.");
    } else {
        const daysSince = getStoredDateAndDifference();
        showVisitPopup(`You last visited ${daysSince} days ago.`);
    }
    localStorage.setItem('lastDate', now.toISOString());
});

function showVisitPopup(message, duration = 5000) {
  const popup = document.getElementById('visitPopup');
  const messageSpan = document.getElementById('visitPopupMessage');
  const closeBtn = document.getElementById('visitPopupClose');

  messageSpan.textContent = message;
  popup.classList.remove('hide');


  const timer = setTimeout(() => {
    popup.classList.add('hide');
  }, duration);


  closeBtn.onclick = () => {
    popup.classList.add('hide');
    clearTimeout(timer);
  };
}