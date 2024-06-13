import { toggleHamburger } from "./toggleHamburger.js";
import { displayProjects } from "./displayProjects.js";
import { displaySkills } from "./displaySkills.js";

document.addEventListener('DOMContentLoaded', () =>{
    toggleHamburger();
    displayProjects();
    displaySkills();
});