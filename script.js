"use strict";

// GET BROWSER SCROLLBAR WIDTH
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty(
  "--scrollbar-width",
  `${scrollbarWidth}px`
);

// SCROLL FEEDBACK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navigation a hr");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 72) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((navLink) => {
    if (navLink.parentElement.getAttribute("href").includes(current)) {
      navLink.classList.add("current");
    } else {
      navLink.classList.remove("current");
    }
  });
});

// PROJECT OVERLAY
const overlay = document.querySelector("#project-overlay");
overlay.addEventListener("click", (e) => {
  if (e.target == overlay) {
    closeOverlay();
  }
});
overlay.children[0];

const closeButton = document.querySelector("#project-overlay button");
closeButton.addEventListener("click", closeOverlay);

function openOverlay(id) {
  overlay.classList.add("active");
  overlay.scrollTo(0, 0);

  const title = overlay.querySelector("h1");
  switch (id.toLowerCase()) {
    case "oversoc":
      title.textContent = "OverSOC";
      break;
    case "notaspyware":
      title.textContent = "Not A Spyware";
      break;
    case "cryptide":
      title.textContent = "Cryptide";
      break;
    case "cubekingdoms":
      title.textContent = "Cube Kingdoms";
      break;
    case "horrorfactory":
      title.textContent = "Horror Factory";
      break;
    case "candlelightvr":
      title.textContent = "Candlelight VR";
      break;
    case "maximtherobot":
      title.textContent = "Maxim the Robot";
      break;
    case "meadgard":
      title.textContent = "Meadgard";
      break;
    default:
      break;
  }
}

function closeOverlay() {
  overlay.classList.remove("active");
}

const projects = document.querySelectorAll(".project");
projects.forEach((project) => {
  project.addEventListener("click", function () {
    openOverlay(this.id);
  });
});
