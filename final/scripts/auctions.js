import displayElements from "./main.mjs";
import cards from "./cards.mjs";

const allButton = document.querySelector('#all-button');
const closedButton = document.querySelector('#closed-button');
const openButton = document.querySelector('#open-button');
const monthButton = document.querySelector('#month-button');
const yearButton = document.querySelector('#year-button');

displayElements();
cards.getAuctions(
    'https://el-luih.github.io/wdd231/final/data/auctions.json',
    'auction-display',
    'all',
    'auctions-modal',
    'auction-map'
);

allButton.addEventListener('click', () => {
    cards.getAuctions(
        'https://el-luih.github.io/wdd231/final/data/auctions.json',
        'auction-display',
        'all',
        'auctions-modal',
        'auction-map'
    );
});

closedButton.addEventListener('click', () => {
    cards.getAuctions(
        'https://el-luih.github.io/wdd231/final/data/auctions.json',
        'auction-display',
        'closed',
        'auctions-modal',
        'auction-map'
    );
});

openButton.addEventListener('click', () => {
    cards.getAuctions(
        'https://el-luih.github.io/wdd231/final/data/auctions.json',
        'auction-display',
        'open',
        'auctions-modal',
        'auction-map'
    );
});

monthButton.addEventListener('click', () => {
    cards.getAuctions(
        'https://el-luih.github.io/wdd231/final/data/auctions.json',
        'auction-display',
        'month',
        'auctions-modal',
        'auction-map'
    );
});

yearButton.addEventListener('click', () => {
    cards.getAuctions(
        'https://el-luih.github.io/wdd231/final/data/auctions.json',
        'auction-display',
        'year',
        'auctions-modal',
        'auction-map'
    );
});

