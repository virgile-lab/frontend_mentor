/*** Toggle Color Scheme ***/

const tooltipToggle = document.querySelector(".toggle-tooltip");
const toggleColorScheme = document.querySelector(".toggle-color-scheme");

/* Colors and properties of color scheme */

function darkColorScheme() {

    // Change value of HTML attribute "data-color-scheme" to "dark"
    toggleColorScheme.setAttribute('data-color-scheme', 'dark');

    // Dark color scheme colors and properties
    document.documentElement.style.setProperty('--clr-neutral-100', 'hsl(240, 100%, 5%)');
    document.documentElement.style.setProperty('--clr-neutral-400', 'hsl(236, 13%, 60%)');
    document.documentElement.style.setProperty('--clr-neutral-900', 'hsl(240, 18%, 35%)');
}

function lightColorScheme() {

    // Change value of HTML attribute "data-color-scheme" to "light"
    toggleColorScheme.setAttribute('data-color-scheme', 'light');

    // Light color scheme colors and properties
    document.documentElement.style.setProperty('--clr-neutral-100', 'hsl(36, 100%, 99%)');
    document.documentElement.style.setProperty('--clr-neutral-400', 'hsl(236, 13%, 42%)');
    document.documentElement.style.setProperty('--clr-neutral-900', 'hsl(240, 100%, 5%)');
}

/** Browser color scheme detection **/

//Detect and apply the color scheme matches the browser preferences, and display a tooltip message

const browserColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)'); // Get the browser color dark scheme preference "true | false"
const browserColorSchemeLight = window.matchMedia('(prefers-color-scheme: light)'); // Get the browser color light scheme preference "true | false"

function browserColorSchemePreference(colorScheme, tooltipTime = 5000) { // colorScheme = "dark" | "light", tooltipTime = time in miliseconds (if not passed, default = 5000)

    // Apply color scheme
    if (colorScheme === "dark") {
        darkColorScheme()
    } else {
        lightColorScheme()
    }

    // Display the tooltip message
    tooltipToggle.innerHTML = colorScheme + " color scheme applied based on your browser preferences";
    tooltipToggle.setAttribute('data-tooltip', 'true');

    // Undisplay the tooltip after a while
    setTimeout(() => {
        tooltipToggle.setAttribute('data-tooltip', 'false');
    }, tooltipTime)

    // Store the color scheme detected
    localStorage.setItem('colorScheme', colorScheme)

    // Store the tooltip as already displayed
    localStorage.setItem('tooltip', 'true');

}


/* First detection of the browser color scheme preference */

var tooltipStorage = localStorage.getItem('tooltip'); // Get the data tooltip in local storage "true | false"

if (tooltipStorage != "true") { // If tooltip was never displayed...

    if (browserColorSchemeDark.matches) { // ...and if the browser color scheme preference is dark

        browserColorSchemePreference("dark")

    } else if (browserColorSchemeLight.matches) { // ...and if the browser color scheme preference is light

        browserColorSchemePreference("light")
    }

}

/* Change color scheme when the browser's color scheme preference is changed */

browserColorSchemeDark.addEventListener('change', function () {

    if (browserColorSchemeDark.matches) {

        browserColorSchemePreference("dark")

    } else if (browserColorSchemeLight.matches) {

        browserColorSchemePreference("light")
    }
}
)

/** End Browser color scheme detection **/


/* Apply and store the color scheme on click on the toggle button */

toggleColorScheme.addEventListener('click', () => {

    var dataColorScheme = toggleColorScheme.getAttribute('data-color-scheme');

    if (dataColorScheme === "light") {

        darkColorScheme();
        localStorage.setItem('colorScheme', 'dark');

    } else {

        lightColorScheme();
        localStorage.setItem('colorScheme', 'light');

    }
});

/* Apply the color scheme stored in the local storage */

function applyColorSchemeStored() {

    var colorSchemeStored = localStorage.getItem('colorScheme');

    if (colorSchemeStored === "light") {

        lightColorScheme();

    } else {

        darkColorScheme();

    }
};

applyColorSchemeStored();

/*** End Toggle Color Scheme ***/