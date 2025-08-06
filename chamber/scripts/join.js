import setDefaultElements from "./main.mjs";
import form from "./form.mjs";
import membership from "./membership.mjs";

setDefaultElements();

form.getTimestamp('timestamp');

membership.displayInfoModal(0, 'membership-modal', 'np-button');
membership.displayInfoModal(1, 'membership-modal', 'bronze-button');
membership.displayInfoModal(2, 'membership-modal', 'silver-button');
membership.displayInfoModal(3, 'membership-modal', 'gold-button');