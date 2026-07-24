// JS for box-shadow under header when scrolling
// New div-element "intercept" will be put above header and then observed if still there
const header = document.getElementsByClassName("header")[0];
const intercept = document.createElement("div");

// Not necessary to give div-Element an id, but so you know what it's for.
intercept.setAttribute("id", "intercept-observer");

// // div with specific range under top
// // -> shadow will not come until this specific range (100px) is scrolled. 
// intercept.style.setProperty("position", "absolute");
// intercept.style.setProperty("top", "100px");

header.before(intercept);

// Didn't want to change all the css files, so css get handled here directly
header.style.setProperty("transition", "box-shadow 200ms cubic-bezier(0.33, 1, 0.68, 1)");

const observer = new IntersectionObserver(([domElement]) => {
    if (!domElement.isIntersecting){
        header.style.setProperty("box-shadow", "hsla(0 0% 0% / 0.1) 0 0.25rem 0.5rem");
        header.style.setProperty("transition-duration", "400ms");
    }
    else {
        header.style.removeProperty("box-shadow");
        header.style.removeProperty("transition-duration");
    }
});

observer.observe(intercept);