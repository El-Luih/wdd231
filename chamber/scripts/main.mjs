/*Reactive Navigation Menu*/
export default function setDefaultElements() {
  const navButton = document.querySelector('#nav-button');
  const navMenu = document.querySelector("#nav-menu");

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

/*
I've decided to consolidate the shared logic from previous files into a single module, since the operations are very simple.

The new functions required for the latest assignment are organized into separate modules—one per task. 
Unlike the examples I was shown, which are tied to specific and predefined elements, I chose to use parameters 
and accept arguments to make the functions more reusable. This is part of my practice for writing more flexible code in the future.

I don’t usually write comments, but in this case, I felt they were necessary to help me keep track of how the code is structured 
and how the different files relate to each other—something that becomes a bit challenging when working across multiple files.
*/



