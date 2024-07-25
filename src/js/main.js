import { toggleHamburger } from "./toggleHamburger.js";
import { displayProjects } from "./displayProjects.js";
import { displaySkills } from "./displaySkills.js";
import { sendMail } from "./sendMail.js";
import { animationObserver } from "./animationObserver.js";

document.addEventListener('DOMContentLoaded', () =>{
    toggleHamburger();
    displayProjects();
    displaySkills();
    sendMail();
    animationObserver();
});