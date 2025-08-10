import setDefaultElements from "./main.mjs";
import a from "./activities.mjs";

setDefaultElements();
a.getActivities('https://el-luih.github.io/wdd231/chamber/data/activities.json', 'activities-grid');