const npPrice = 500;
const bronzePrice = 1200;
const silverPrice = 3000;
const goldPrice = 6500;

const membershipManager = {
    /* Adds the necessary tags for appropriate styling to an element that displays 
    the membership level of a specific business object, using its "level" property (an integer).
    Arguments:
    - The membership level.
    - A reference to the HTML element where the membership level is being shown.*/
    styleMembership(businessLevel, levelElement) {
        if (businessLevel === 1) {
            levelElement.textContent = "Member";
            levelElement.classList.add("bronze");
        } else if (businessLevel === 2) {
            levelElement.textContent = "Silver";
            levelElement.classList.add("silver");
        } else if (businessLevel === 3) {
            levelElement.textContent = "Gold"
            levelElement.classList.add("gold");
        } else if (businessLevel === 0) {
            levelElement.textContent = "NP"
            levelElement.classList.add("non-profit");
        };
    },

    /*Displays the information about a specific type of membership in a given
    container HTML element.
    Arguments
    - The numeric membership level to display information for.
    - The ID of the HTML container where the information will be rendered.
    */
    displayInfo(membershipLevel, infoContainerID) {
        const container = document.querySelector(`#${infoContainerID}`);
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const benefitsList = document.createElement('ul');
        benefitsList.classList.add('benefits-list');
        const price = document.createElement('h3');
        if (membershipLevel === 1) {
            title.textContent = 'Bronze Membership';
            title.classList.add("bronze");
            description.textContent = 'Entry-level for small businesses and startups';
            benefitsList.innerHTML = `
            <li>Business listing in the online Chamber directory</li>
            <li>Invitations to bi-monthly networking events</li>
            <li>Access to the Chamber’s promotional calendar</li>
            <li>Chamber newsletter with local business updates and opportunities</li>
            <li>Discounted access to select business development workshops</li>
            <li>Certificate of membership (print & digital)</li>`
            price.textContent = `Q${bronzePrice}/year`;
        } else if (membershipLevel === 2) {
            title.textContent = 'Silver Membership';
            title.classList.add("silver");
            description.textContent = 'For established SMEs aiming to grow their network';
            benefitsList.innerHTML = `
            <li>All Bronze benefits, plus:</li>
            <li>Enhanced business listing (with logo, link, and description)</li>
            <li>Access to Chamber’s business intelligence reports and local market data</li>
            <li>Free access to 3 training events or masterclasses per year</li>
            <li>One-on-one business consultation (1 per year)</li>
            <li>Discounted vendor services via Chamber partners</li>
            <li>Eligibility to speak at Chamber events and panels</li>`
            price.textContent = `Q${silverPrice}/year`;
        } else if (membershipLevel === 3) {
            title.textContent = 'Gold Membership';
            title.classList.add("gold");
            description.textContent = 'For leading businesses or those wanting high visibility and influence';
            benefitsList.innerHTML = `
            <li>All Silver benefits, plus:</li>
            <li>Featured promotion in Chamber communications (1 spotlight/year)</li>
            <li>Priority access to trade missions, delegations, and investment forums</li>
            <li>Dedicated Chamber liaison for strategic support</li>
            <li>Eligibility for leadership roles in Chamber committees</li>
            <li>Priority booth placement at Chamber expos and trade fairs</li>
            <li>Exclusive Gold-only networking events with policymakers, investors, and media</li>`
            price.textContent = `Q${goldPrice}/year`;
        } else if (membershipLevel === 0) {
            title.textContent = 'Non-Profit Membership';
            title.classList.add("non-profit");
            description.textContent = 'For NGOs, foundations, and social enterprises';
            benefitsList.innerHTML = `
            <li>Free or discounted membership fee</li>
            <li>Access to quarterly nonprofit-focused workshops (e.g., fundraising, governance)</li>
            <li>Listing in the “Social Impact” section of the Chamber directory</li>
            <li>Networking opportunities with businesses for potential partnerships or CSR support</li>
            <li>Monthly nonprofit-specific newsletter</li>
            <li>Assistance with legal/regulatory issues relevant to NGOs in Guatemala</li>`
            price.innerHTML = `Q0 - Q${npPrice}/year<span>(based on size and funding status)</span>`;
        };
        container.appendChild(title);
        container.appendChild(description);
        container.appendChild(benefitsList);
        container.appendChild(price);
    },

    /*Configures a specific button to trigger the display of information 
    about a given membership type in a designated modal container.
    The button should already be assigned as the modal's display prompt.
    Arguments:
    - The membership type level to be displayed.
    - The ID of the modal conatiner where the information will be rendered.
    - The ID of the button that will trigger the display.
    */
    displayInfoModal(membershipLevel, modalContainerID, buttonID) {
        const promptButton = document.querySelector(`#${buttonID}`);
        const containerModal = document.querySelector(`#${modalContainerID}`);

        promptButton.addEventListener('click', () => {
            containerModal.innerHTML = '';
            this.displayInfo(membershipLevel, modalContainerID);
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.setAttribute('popovertarget', modalContainerID);
            closeButton.setAttribute('popovertargetaction', 'hide');
            closeButton.textContent = '✖';
            containerModal.appendChild(closeButton);
        });
    }
}

export default membershipManager;