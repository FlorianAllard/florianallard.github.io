"use strict";

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll("#navigation a hr");

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 72) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(navLink => {
        if (navLink.parentElement.getAttribute("href").includes(current)) {
            navLink.classList.add("current");
        }
        else {
            navLink.classList.remove("current");
        }
    });
});