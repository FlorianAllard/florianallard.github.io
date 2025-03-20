"use strict";
var projectData;
fetch("/assets/data.json")
  .then((res) => res.json())
  .then((data) => {
    projectData = data.projects;
  })
  .then(() => {
    instantiateProjects();
  });

// GET BROWSER SCROLLBAR WIDTH
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty(
  "--scrollbar-width",
  `${scrollbarWidth}px`
);

//#region SCROLL FEEDBACK
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
//#endregion

//#region PROJECT OVERLAY

const overlay = document.querySelector("#project-overlay");

overlay.addEventListener("click", (e) => {
  if (e.target == overlay) {
    closeOverlay();
  }
});
const closeButton = document.querySelector("#project-overlay button");
console.log(closeButton);
closeButton.addEventListener("click", closeOverlay);

function closeOverlay() {
  overlay.classList.remove("active");
}

const overlayContent = overlay.querySelector(".content");
const overlayContentHtml = overlayContent.innerHTML;

function openOverlay(currentProjectData) {
  overlay.classList.add("active");
  overlayContent.innerHTML = overlayContentHtml;
  overlay.scrollTo(0, 0);

  const title = overlay.querySelector("h1");
  title.textContent = currentProjectData.title;

  currentProjectData.overlayContent.forEach((a) => {
    var newElement;

    switch (a.type) {
      case "img":
        newElement = document.createElement("img");
        newElement.setAttribute("src", a.src);
        newElement.setAttribute("alt", a.alt);
        if (a.modifier) {
          newElement.classList.add(a.modifier);
        }
        overlayContent.appendChild(newElement);
        break;

        case "a":
          newElement = document.createElement("a");
          newElement.textContent = a.href;
          newElement.setAttribute("href", a.href);
          newElement.setAttribute("target", "_blank");
          overlayContent.appendChild(newElement);
          break;

      default:
        a.content.forEach((string) => {
          newElement = document.createElement(a.type);
          newElement.innerHTML = string;
          overlayContent.appendChild(newElement);
        });
        break;
    }
  });
}

//#endregion

//#region PROJECT TEMPLATE
function instantiateProjects() {
  const projectTemplate = document.querySelector("#project-template");

  projectData.forEach((data) => {
    let projectClone = projectTemplate.content.cloneNode(true);
    const project = projectClone.querySelector(".project");
    projectTemplate.parentNode.appendChild(projectClone);

    project.id = data.id;
    project.addEventListener("click", function () {
      openOverlay(data);
    });

    const imgArray = project.querySelectorAll("img");
    imgArray.forEach((img) => {
      img.setAttribute("src", data.cover.src);
      img.setAttribute("alt", data.cover.alt);
    });

    const title = project.querySelector("h4");
    title.textContent = data.title;

    const desc = project.querySelector("p");
    desc.textContent = data.desc;

    const chipTemplate = project.querySelector("#chip-template");
    data.chips.forEach((chipData) => {
      let chipClone = chipTemplate.content.cloneNode(true);
      const chip = chipClone.querySelector(".chip");
      chip.textContent = chipData;
      chipTemplate.parentNode.appendChild(chipClone);
    });
  });
}
//#endregion
