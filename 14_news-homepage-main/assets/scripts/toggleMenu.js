/*** Toggle menu ***/

const toggleMenu = document.querySelector(".toggle-menu");
const primaryNav = document.querySelector(".primary-nav");
const bodyDocument = document.querySelector("body");
const screenOverlay = document.querySelector(".screen-overlay");

// Open/Close the menu on click

toggleMenu.addEventListener('click', () => {

    var visibility = primaryNav.getAttribute('data-visible');

    if (visibility === 'false') {

        bodyDocument.style.overflowY = "hidden";
        primaryNav.setAttribute('data-visible', 'true');

    } else {

        bodyDocument.style.overflowY = "scroll";
        primaryNav.setAttribute('data-visible', 'false');

    }
});

// Close the menu on click on the overlay

screenOverlay.addEventListener('click', () => {

    bodyDocument.style.overflowY = "scroll";
    primaryNav.setAttribute('data-visible', 'false');

});

// Close the menu on resize if the viewport width is >= 768px (in the case where a user on big mobile turn it on landscape mode and the menu is open)

window.addEventListener('resize', () => {

    var viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {

        bodyDocument.style.overflowY = "scroll";
        primaryNav.setAttribute('data-visible', 'false');

    }
});

/*** End Toggle menu ***/