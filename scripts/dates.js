const dateField = document.querySelector("#currentYear");
const lastModified = document.querySelector('#lastModified');

const today = new Date();

dateField.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
