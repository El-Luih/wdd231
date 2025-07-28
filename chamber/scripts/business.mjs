const businessDataManager = {
    /*Retrives the businesses data from an specific url and calls the display
    function on the retrived object's companies array.
    Arguments:
    - Businesses data URL.
    - The container element ID.
    - The number of business cards.
    - Level value for filtering.*/
    async getBusinesses(directory, containerID, count = 1, level = 1) {
        const retrieve = await fetch(directory);
        const members = await retrieve.json();
        this.displayBusinesses(members.companies, containerID, count, level);
    },

    /*Counts the number of items in an array of businesses and returns an specified amount of random indexes
    Arguments:
    - The business array.
    - The number of random outputs desired.*/
    randomizeBusinesses(businesses, outputCount = 1) {
        const businessesCount = businesses.length;
        const indexSet = new Set();

        while (indexSet.size < Math.min(outputCount, businessesCount)) {
            const randomGen = Math.floor(Math.random() * businessesCount);
            indexSet.add(randomGen);
        }

        return Array.from(indexSet);
    },

    /* Adds the necessary tags for appropriate styling to an element that displays 
    the membership level of a specific business object, using its "level" property (an integer).
    Arguments:
    - The membership level.
    - The HTML element that displays the membership level. */
    displayMembership(businessLevel, levelElement) {
        if (businessLevel === 1) {
            levelElement.textContent = "Member";
            levelElement.classList.add("bronze");
        } else if (businessLevel === 2) {
            levelElement.textContent = "Silver";
            levelElement.classList.add("silver");
        } else if (businessLevel === 3) {
            levelElement.textContent = "Gold"
            levelElement.classList.add("gold");
        } else {
            levelElement.textContent = "Not a Member"
            levelElement.classList.add("no-member");
        };
    },

    /*Creates the HTML elements of each business card according to the format 
    given in the assignment and appends it to the specified container element.
    The business array is filtered by membership level.
    Arguments:
    - An array of businesses.
    - The ID of the container element in HTML.
    - The number of business cards to display.
    - Level value for filtering.
    */
    displayBusinesses(businesses, containerID, outputCount = 1, level = 1) {
        const containerElement = document.querySelector(`#${containerID}`);
        const filteredBusinesses = businesses.filter((business) => business.level >= level);
        console.log(filteredBusinesses);
        const indexes = this.randomizeBusinesses(filteredBusinesses, outputCount)

        indexes.forEach(index => {
            const business = filteredBusinesses[index];

            const businessArticle = document.createElement('article');
            const bArticleName = document.createElement('h2');
            const bArticleLevel = document.createElement('h3');
            const bArticleInfoGrid = document.createElement('div');
            const bArticleImage = document.createElement('img');
            const bArticleTextContainer = document.createElement('div');
            const bArticlePhone = document.createElement('p');
            const bArticleURL = document.createElement('p');
            const bArticleAddress = document.createElement('p');

            const businessName = business.name;
            const businessLevel = business.level;
            const businessImage = business.icon;
            const businessPhone = business.phoneNumber;
            const businessURL = business.url;
            const address = business.address;
            const businessAddress = `${address.street}, ${address.zone}`

            bArticleName.textContent = businessName;
            this.displayMembership(businessLevel, bArticleLevel);
            bArticleImage.setAttribute('src', `images/${businessImage}`);
            bArticleImage.setAttribute('alt', `${businessName} Logo`);
            bArticleImage.setAttribute('loading', 'lazy');
            bArticlePhone.innerHTML = `<strong>Phone: </strong>${businessPhone}`;
            bArticleURL.innerHTML = `<strong>URL: </strong>${businessURL}`;
            bArticleAddress.innerHTML = `<strong>Address: </strong>${businessAddress}`;

            bArticleTextContainer.classList.add('art-txt-container');
            bArticleTextContainer.appendChild(bArticlePhone);
            bArticleTextContainer.appendChild(bArticleURL);
            bArticleTextContainer.appendChild(bArticleAddress);

            bArticleInfoGrid.classList.add('art-info-grid');
            bArticleInfoGrid.appendChild(bArticleImage);
            bArticleInfoGrid.appendChild(bArticleTextContainer);

            businessArticle.classList.add('business-article');
            businessArticle.appendChild(bArticleName);
            businessArticle.appendChild(bArticleLevel);
            businessArticle.appendChild(bArticleInfoGrid);

            containerElement.appendChild(businessArticle);
        });
    },


}

export default businessDataManager;