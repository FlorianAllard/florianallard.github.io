"use strict";
var projectData;
fetch("./assets/data.json")
  .then((res) => res.json())
  .then((data) => {
    projectData = data.projects;
  })
  .then(() => {
    instantiateProjects();
  });

const skills = document.querySelectorAll(`#skills input[type="radio"]`);
for (let i = 0; i < skills.length; i++) {
  const skill = skills[i];
  if (i==0) {
    skill.checked = true;
  } else {
    skill.checked = false;
  }
}

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
      
      case "figure":
        newElement = document.createElement("figure");
        newElement.innerHTML = 
        `<figure class='flex-column center-content'>
          <img src='${a.src}' alt='${a.alt}' class='side-margins' />
          <figcaption>${a.caption}</figcaption>
        </figure>`;
        overlayContent.appendChild(newElement);
        break;

      case "a":
          newElement = document.createElement("a");
          newElement.textContent = a.label;
          newElement.setAttribute("href", a.href);
          newElement.setAttribute("target", "_blank");
          overlayContent.appendChild(newElement);
          break;

      case "iframe":
        newElement = document.createElement("iframe");
        newElement.setAttribute("src", a.src + "?autoplay=1&mute=1&controls=0");
        newElement.setAttribute("frameborder", "0");
        newElement.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        newElement.setAttribute("allowfullscreen", "");
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
