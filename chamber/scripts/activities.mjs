const activitiesManager = {
    async getActivities(URL, containerID) { 
        const retrieve = await fetch(URL);
        const activities = await retrieve.json();
        this.displayActivities(activities.items, containerID);
    },


    displayActivities(activities, containerID) {
        const containerElement = document.querySelector(`#${containerID}`);
        console.log(activities);

        activities.forEach(item => {

            const activityArticle = document.createElement('article');
            const actArticleTitle = document.createElement('h3');
            const actArticleTrans = document.createElement('span');
            const actArticleFig = document.createElement('figure');
            const actArticleImg = document.createElement('img');
            const actArticleAddress = document.createElement('address');
            const actArticleDesc = document.createElement('p');
            const actArticleButton = document.createElement('button');

            const activityName = item.name;
            const activityTrans = item.translation;
            const activityImage = item.image;
            const address = item.address;
            const activityAddress = `
            <strong>${address.reference}</strong><br>
            ${address.street}, ${address.zone}
            `
            const activityDesc = item.description;
            

            actArticleTitle.textContent = activityName;
            actArticleTrans.textContent = activityTrans;
            actArticleTrans.classList.add('translation');
            actArticleTitle.appendChild(actArticleTrans);

            actArticleImg.setAttribute('src', `images/${activityImage}`);
            actArticleImg.setAttribute('alt', activityName);
            actArticleImg.setAttribute('loading', 'lazy');
            actArticleImg.setAttribute('width', '300');
            actArticleImg.setAttribute('height', '200');
            actArticleFig.appendChild(actArticleImg);

            actArticleAddress.innerHTML = activityAddress;
            actArticleDesc.textContent = activityDesc;

            actArticleButton.textContent = 'Learn More';
            actArticleButton.classList.add('generic-button');

            activityArticle.appendChild(actArticleFig);
            activityArticle.appendChild(actArticleTitle);
            activityArticle.appendChild(actArticleAddress);
            activityArticle.appendChild(actArticleDesc);
            activityArticle.appendChild(actArticleButton);
            activityArticle.classList.add('activity-card');

            containerElement.appendChild(activityArticle);
        });
    },

}

export default activitiesManager;