import displayElements from "./main.mjs";
import { setVisitPopup } from "./main.mjs";
import cards from "./cards.mjs";

displayElements();
setVisitPopup();

cards.getAuctions(
    'https://el-luih.github.io/wdd231/final/data/auctions.json',
    'auction-display',
    'month',
    'index-modal',
    'auction-map'
);

