/*Reactive Navigation Menu*/
export default function setDefaultElements() {
  const navButton = document.querySelector('#main-hamburger');
  const navMenu = document.querySelector("#main-menu");

  navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navMenu.classList.toggle('show');
  });

  /*Dynamic Footer Information*/
  const dateField = document.querySelector("#currentYear");
  const lastModified = document.querySelector('#lastModified');

  const today = new Date();

  dateField.textContent = today.getFullYear();
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}


function setVisitPopup() {
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
          showVisitPopup("Welcome to our site.");
      } else if (getStoredDateAndDifference() < 1) {
          showVisitPopup("Glad to see you again so soon.");
      } else if (getStoredDateAndDifference() === 1) {
          showVisitPopup("You last visit was 1 day ago.");
      } else {
          const daysSince = getStoredDateAndDifference();
          showVisitPopup(`You last visit was ${daysSince} days ago.`);
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
}

export { setVisitPopup };