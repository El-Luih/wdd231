import setDefaultElements from "./main.mjs";

setDefaultElements();

const memberList = document.querySelector("#member-list");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

gridButton.addEventListener("click", () => {
	memberList.classList.add("grid");
	memberList.classList.remove("list");
});

listButton.addEventListener("click", showList);

function showList() {
	memberList.classList.add("list");
    memberList.classList.remove("grid");
}


async function getCompanies() {
    const retrieve = await fetch("https://el-luih.github.io/wdd231/chamber/data/members.json");
    const members = await retrieve.json();
    displayCompanies(members.companies);
}

function displayCompanies(companies) {
    companies.forEach((company) => {
        let card = document.createElement("section");
        let logo = document.createElement("img");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");
        let level = document.createElement("p");
        card.classList.add("company-card");
        logo.setAttribute("src", `images/${company.icon}`);
        logo.setAttribute("alt", `${company.name} Logo`);
        logo.setAttribute("loading", "lazy");
        name.classList.add("company-name");
        name.textContent = company.name;
        address.textContent = `${company.address.street} ${company.address.zone} ${company.address.city} ${company.address.postalCode}`;
        phone.textContent = company.phoneNumber;
        url.setAttribute("href", company.url);
        url.textContent = company.url;
        level.classList.add("level-label");
        if (company.level === 1) {
            level.textContent = "Member";
            level.classList.add("bronze");
        } else if (company.level === 2) {
            level.textContent = "Silver";
            level.classList.add("silver");
        } else if (company.level === 3) {
            level.textContent = "Gold"
            level.classList.add("gold");
        } else {
            level.textContent = "Not a Member"
            level.classList.add("no-member");
        };
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(level);
        card.appendChild(url);
        memberList.appendChild(card);
    });
}

getCompanies();