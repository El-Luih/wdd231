const formProcessor = {
    displayConfirmInformation(containerID) {
        const container = document.getElementById(containerID);
        const params = new URLSearchParams(window.location.search);
        const infoBox = document.createElement('div');
        infoBox.classList.add('confirmation-info');
        infoBox.innerHTML = `
        <p><strong>First Name:</strong> <span>${params.get('fname')}</span></p>
        <p><strong>Last Name:</strong> <span>${params.get('lname')}</span></p>
        <p><strong>Email:</strong>  <span>${params.get('email')}</span></p>
        <p><strong>Mobile Number:</strong>  <span>${params.get('phone-number')}</span></p>
        <p><strong>Weapon Antiquity:</strong>  <span>${params.get('antiquity')}</span></p>
        <p><strong>Weapon Type:</strong>  <span>${params.get('weapon-type')}</span></p>
        <img src="images/weapons/${params.get('weapon-type')}.svg" alt="${params.get('weapon-type')} Icon">`
        container.appendChild(infoBox);
    }
}

export default formProcessor;