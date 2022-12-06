/*** Toggle Primary Nav ***/

const toggleMenu = document.querySelector(".toggle-menu");
const primaryNav = document.querySelector(".primary-nav");
const bodyDocument = document.querySelector("body");
const screenOverlay = document.querySelector(".screen-overlay");

window.addEventListener('resize', () => {

    var viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {

        bodyDocument.style.overflowY = "scroll";
        primaryNav.setAttribute('data-visible', 'false');
    }
});

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

screenOverlay.addEventListener('click', () => {

    bodyDocument.style.overflowY = "scroll";
    primaryNav.setAttribute('data-visible', 'false');

});

/*** End Toggle Primary Nav ***/

/*** Dark/Light Theme ***/

const tooltipToggleTheme = document.querySelector(".toggle-theme-tooltip");
const toggleThemeBtn = document.querySelector(".toggle-theme-btn");

/* Colors and properties of themes */

function darkTheme() {
    // Change value of HTML attribute "data-theme" to "dark"
    toggleThemeBtn.setAttribute('data-theme', 'dark');
    // Dark theme colors and properties
    document.documentElement.style.setProperty('--clr-neutral-100', 'hsl(240, 100%, 5%)');
    document.documentElement.style.setProperty('--clr-neutral-400', 'hsl(236, 13%, 60%)');
    document.documentElement.style.setProperty('--clr-neutral-900', 'hsl(240, 18%, 35%)');
}

function lightTheme() {
    // Change value of HTML attribute "data-theme" to "light"
    toggleThemeBtn.setAttribute('data-theme', 'light');
    // Light theme colors and properties
    document.documentElement.style.setProperty('--clr-neutral-100', 'hsl(36, 100%, 99%)');
    document.documentElement.style.setProperty('--clr-neutral-400', 'hsl(236, 13%, 42%)');
    document.documentElement.style.setProperty('--clr-neutral-900', 'hsl(240, 100%, 5%)');
}

/** Browser color scheme detection **/

//Detect and apply the theme matches the browser preferences, and display a tooltip message

const browserThemeDark = window.matchMedia('(prefers-color-scheme: dark)'); // Get the browser color dark scheme preference "true | false"
const browserThemeLight = window.matchMedia('(prefers-color-scheme: light)'); // Get the browser color light scheme preference "true | false"
var tooltipStorage = localStorage.getItem('tooltip'); // Get the data tooltip in local storage "true | false"
const tooltipTimeDisplay = 5000; // Tooltip time displaying on screen in miliseconds


function browserThemePreferenceDark() {

    // Apply dark theme
    darkTheme();

    // Display dark theme tooltip message
    tooltipToggleTheme.innerHTML = "Dark theme applied based on your browser preferences";
    tooltipToggleTheme.setAttribute('data-display', 'true');

    // Undisplay the tooltip after a time
    setTimeout(() => {
        tooltipToggleTheme.setAttribute('data-display', 'false');
    }, tooltipTimeDisplay)

    // Store the theme detected
    localStorage.setItem('theme', 'dark')

    // Store the tooltip as already displayed
    localStorage.setItem('tooltip', 'true');

}

function browserThemePreferenceLight() {

    // Apply light theme
    lightTheme();

    // Display light theme tooltip message
    tooltipToggleTheme.innerHTML = "Light theme applied based on your browser preferences";
    tooltipToggleTheme.setAttribute('data-display', 'true');

    // Undisplay the tooltip after a time
    setTimeout(() => {
        tooltipToggleTheme.setAttribute('data-display', 'false');
    }, tooltipTimeDisplay)

    // Store the theme detected
    localStorage.setItem('theme', 'light')

    // Store the tooltip as already displayed
    localStorage.setItem('tooltip', 'true');
}

/* First detection of the browser color scheme preference */

if (tooltipStorage != "true") { // If tooltip was never displayed...

    if (browserThemeDark.matches) { // ...and if the browser color scheme preference is dark

        browserThemePreferenceDark()

    } else if (browserThemeLight.matches) { // ...and if the browser color scheme preference is light

        browserThemePreferenceLight()
    }

}

/* Change theme when the browser color scheme preference is changed */

browserThemeDark.addEventListener('change', function () {

    if (browserThemeDark.matches) {
        browserThemePreferenceDark()

    } else if (browserThemeLight.matches) {
        browserThemePreferenceLight()
    }
}
)

/** End Browser color scheme detection **/


/* Apply and store the theme on click on the toggle button */

toggleThemeBtn.addEventListener('click', () => {

    var dataTheme = toggleThemeBtn.getAttribute('data-theme');

    if (dataTheme === "light") {

        darkTheme();
        localStorage.setItem('theme', 'dark');

    } else {

        lightTheme();
        localStorage.setItem('theme', 'light');

    }
});

/* Apply the user theme choice */

function applyThemeStore() {

    var themeStore = localStorage.getItem('theme');

    if (themeStore === "light") {

        lightTheme();

    } else {

        darkTheme();

    }
};

applyThemeStore();

/*** End Dark/Light Theme ***/