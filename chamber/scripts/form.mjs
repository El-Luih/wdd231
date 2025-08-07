const formProcessor = {
    /*Retrieves the user's local time at the time of loading the document 
    and inserts it as the form's timestamp value.
    Arguments:
    - The container element ID for the timestamp.*/
    getTimestamp(containerID) {
        document.addEventListener("DOMContentLoaded", function () {
            const timestampInput = document.getElementById(containerID);
            const now = new Date();
            timestampInput.value = now.toString();
        });
    },

    /*Retrieves the URL search query parameters from a form confirmation page,  
    submitted via a previous form-containing page, and appends them to an info 
    container element.
    Arguments:
    - The container element ID for the URL parameters.*/
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
        <p><strong>Business/Organization:</strong>  <span>${params.get('organization')}</span></p>
        <p class="timestamp-display"><strong>${params.get('timestamp')}</strong></p>`
        container.appendChild(infoBox);
    }
}

export default formProcessor;