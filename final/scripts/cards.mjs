

const cardsManager = {
    async getAuctions(URL, containerID, filterOptions, modalID, mapID) {
        try {
            const retrieve = await fetch(URL);
            if (!retrieve.ok) {
                throw new Error(`Network response was not ok: ${retrieve.statusText}`);
            }
            const auctions = await retrieve.json();
            this.displayAuctions(auctions, containerID, filterOptions, modalID, mapID);
        } catch (error) {
            console.error("Error fetching auctions:", error);
        }
    },

    displayAuctions(auctions, containerID, filterOptions, modalID, mapID) {
        const filteredAuctions = this.filterAuctions(auctions, filterOptions);
        const container = document.getElementById(containerID);
        const map = document.getElementById(mapID);

        this.buildAuctions(filteredAuctions, container, modalID, map);
    },

    filterAuctions(auctionsArray, filterOptions) {
        const nowDays = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
        const nowMonth = new Date().getMonth();
        const nowYear = new Date().getFullYear();

        if (filterOptions === "all") {
            return auctionsArray;

        } else if (filterOptions === "closed") {
            return auctionsArray.filter((auction) => {
                return Math.floor(new Date(auction.date) / 1000 / 60 / 60 / 24) < nowDays;
            });

        } else if (filterOptions === "open") {
            return auctionsArray.filter((auction) => {
                return Math.floor(new Date(auction.date) / 1000 / 60 / 60 / 24) >= nowDays;
            });

        } else if (filterOptions === "month") {
            return auctionsArray.filter((auction) => {
                const d = new Date(auction.date);
                return d.getMonth() === nowMonth && d.getFullYear() === nowYear;
            });
        } else if (filterOptions === "year") {
            return auctionsArray.filter((auction) => {
                return new Date(auction.date).getFullYear() === nowYear;
            });
        }
    },

    buildAuctions(auctions, container, modalID, map) {
        const modal = document.getElementById(modalID);
        auctions.forEach(auction => {
            const auctionDate = new Date(auction.date);
            const auctionDays = Math.floor(auctionDate / 1000 / 60 / 60 / 24);
            const nowDays = Math.floor(Date.now() / 1000 / 60 / 60 / 24)

            const auctionName = auction["event-name"];
            const auctionPlace = auction["event-place"];
            const auctionAddress = auction.address;
            const auctionDateString = auctionDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short"
            });
            const auctionGeo = auction.geo;
            const auctionLat = auctionGeo.latitude;
            const auctionLong = auctionGeo.longitude;

            if (auctionDays < nowDays) {
                
            }

            const cardArticle = document.createElement('article');
            const CArticleName = document.createElement('h4');
            const CArticlePlace = document.createElement('p');
            const CArticleAvaila = document.createElement('p');
            const CArticleButton = document.createElement('button');

            CArticleName.textContent = auctionName;
            CArticlePlace.textContent = auctionPlace;
            CArticlePlace.classList.add('auction-place');
            if (auctionDays >= nowDays) {
                CArticleAvaila.textContent = "Open"
                CArticleAvaila.classList.add('open');
            } else {
                CArticleAvaila.textContent = "Closed"
                CArticleAvaila.classList.add('closed');
            }
            CArticleAvaila.classList.add('auction-availa');
            CArticleButton.textContent = "Learn More";
            CArticleButton.classList.add('generic-button');
            CArticleButton.setAttribute('popovertarget', modalID);

            cardArticle.classList.add('auction-card');
            cardArticle.appendChild(CArticleName);
            cardArticle.appendChild(CArticlePlace);
            cardArticle.appendChild(CArticleAvaila);
            cardArticle.appendChild(CArticleButton);
            this.setMapLocation(auctionLat, auctionLong, cardArticle, map);
            container.appendChild(cardArticle);

            const modalName = document.createElement('h4');
            const modalPlace = document.createElement('p');
            const modalAddress = document.createElement('address');
            const modalDate = document.createElement('p');
            const modalAvaila = document.createElement('p');
            const modalClose = document.createElement('button');

            modalName.textContent = auctionName;
            modalPlace.innerHTML = `
                <strong>Place:</strong>
                <span>${auctionPlace}</span>
            `;
            modalPlace.classList.add('auction-place');
            modalPlace.classList.add('grid-2');
            modalDate.innerHTML = `
                <strong>Date:</strong>
                <span>${auctionDateString}</span>
            `;
            modalDate.classList.add('auction-date');
            modalDate.classList.add('grid-2');
            modalAddress.innerHTML = `
                <strong>Address:</strong>
                <span>${auctionAddress}</span>
            `;
            if (auctionDays >= nowDays) {
                modalAvaila.innerHTML = `
                    <strong>State:</strong>
                    <span class="open">Open</span>
                `;
            } else {
                modalAvaila.innerHTML = `
                    <strong>State:</strong>
                    <span class="closed">Closed</span>
                `;
            }
            modalAvaila.classList.add('auction-availa');
            modalAvaila.classList.add('grid-2');
            modalClose.textContent = "✕";
            modalClose.classList.add('close-button');
            modalClose.setAttribute('popovertarget', modalID);
            modalClose.setAttribute('popovertargetaction', "hide");

            modal.appendChild(modalName);
            modal.appendChild(modalPlace);
            modal.appendChild(modalAddress);
            modal.appendChild(modalDate);
            modal.appendChild(modalAvaila);
            modal.appendChild(modalClose);
        });
    },

    setMapLocation(latitude, longitude, trigger, map) {
        trigger.addEventListener('click', () => {
            map.setAttribute('src', `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`);
        });
    }
}

export default cardsManager;