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

