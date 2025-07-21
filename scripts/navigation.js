const navButton = document.querySelector('#nav-button');
const navMenu = document.querySelector("#nav-menu");

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navMenu.classList.toggle('show');
});