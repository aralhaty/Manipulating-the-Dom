/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * End Global Variables
 * Start Helper Functions
 */
// is section in view (function) ?

function isInView(element) {
  const container = element.getBoundingClientRect();
  return container.top + 200 < window.innerHeight && container.bottom >= 500;
}

/* End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navbar__list = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const frag = document.createDocumentFragment();

sections.forEach(function (section) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<a data-sec="${
    section.id
  }" class="navbar__menu menu__link" href="#${section.getAttribute(
    "id"
  )}">${section.getAttribute("data-nav")}</a>}`;
  listItem.style.cssText = "  display: inline-block;";
  frag.appendChild(listItem);
});
navbar__list.appendChild(frag);

// Add class 'active' to section when near top of viewport

window.onscroll = function () {
  // is section in view (function) ?

  // if so >> add active class to section
  sections.forEach((element) => {
    if (isInView(element)) {
      element.classList.add("active");
      // add active class to the corresponding link
      const links = document.querySelectorAll("a");
      for (const link of links) {
        if (link.dataset.sec === element.id) {
          link.classList.add("activelink");
          link.classList.remove("menu__link");
        } else {
          link.classList.remove("activelink");
          link.classList.add("menu__link");
        }
      }
    } else {
      element.classList.remove("active");
    }
  });
};

/**
 * End Main Functions
 */

// Scroll to section on link click

navbar__list.addEventListener("click", (move) => {
  move.preventDefault();
  if (move.target.dataset.sec) {
    const x = document.getElementById(`${move.target.dataset.sec}`);
    x.scrollIntoView({ behavior: "smooth" });
  }
});
