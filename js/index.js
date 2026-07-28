console.log("--- Start index.js ---")

const headerWappenImg = document.querySelector(".header #wappen");

const domRecipeLists = document.querySelectorAll(".recipe-list");
const domRecipeCards = document.querySelectorAll(".recipe-list>.card");

const bottomBar = document.querySelector(".bottom-bar");
const bottomBarBtns = bottomBar.querySelectorAll("button");
const tabBtns = Array.from(bottomBarBtns).filter((current) => current.id !== "search");
const searchBtn = Array.from(bottomBarBtns).filter((current) => current.id === "search")[0];

const searchBar = document.querySelector(".search-bar");
const searchInput = searchBar.querySelector("#searchInput");
const searchCloseBtn = searchBar.querySelector("#searchCloseBtn");
const searchRecipeBtn = searchBar.querySelector("#searchRecipeBtn");

const TRANSITION_MS = 400;

let currentState = "meals";

let indexCards = [];

// --- Starting state ---

searchBar.style.setProperty("bottom", bottomBar.offsetHeight + "px");

initCardsArr(indexCards, domRecipeCards);

changeRecipeListsVisibility(currentState);

sortRecipeLists(domRecipeLists);

// --- Event-Listeners ---

headerWappenImg.addEventListener("click", (event) => {
    changeRecipeListsVisibility("all");
});

// Damit wird der am nähesten befindliche Link getriggert, wenn in die recipeList geklickt wird.
// Ggf. bessere Variante für klicken von Cards implementieren.
domRecipeLists.forEach(list => {
    list.addEventListener("click", (event) => {
    window.location = event.target.querySelector("a").href;
});
})

tabBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        changeRecipeListsVisibility(button.id);
    })

});

searchBtn.addEventListener("click", (event) => {
    changeRecipeListsVisibility("all");
    searchBar.classList.add('open');
    setSearchBtnActive(true);
    searchInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

searchCloseBtn.addEventListener("click", (event) =>{
    searchBar.classList.remove('open');
    searchInput.value = "";
    setSearchBtnActive(false);
    domRecipeCards.forEach((card) => {
        card.style.setProperty("display", "flex");
    })

    setSearchRecipeBtnActive(false);
});

// dont lose focus on input when click this button.
searchRecipeBtn.addEventListener("mousedown", (event) =>{
    event.preventDefault();
});

searchRecipeBtn.addEventListener("click", (event) =>{
    // want to change status -> !.contains
    setSearchRecipeBtnActive(!searchRecipeBtn.classList.contains("active"));
    searchInput.dispatchEvent(new Event("keyup"));
});

searchInput.addEventListener("keyup", (event) => {

    let inputText = searchInput.value.toLocaleLowerCase();

    indexCards.forEach((indexCard) => {
        
        // search in recipeText when button is active
        let checkRecipe = false;
        if(searchRecipeBtn.classList.contains("active")){
            checkRecipe = indexCard.recipeText.includes(inputText);
        }
        
        // search in recipe title
        if(indexCard.title.toLocaleLowerCase().includes(inputText)
        || checkRecipe){
            indexCard.card.style.setProperty("display", "flex");
        }
        else{
            indexCard.card.style.setProperty("display", "none");
        }
    })
});


// --- Objekte ---

function makeIndexCard (card, href, title, recipeText){
    return {
        card, // same card: card
        href,
        title,
        recipeText
    }
}


// --- FUNKTIONEN ---

async function initCardsArr (cardArr, domCards){
    /*Alternative:
        - Vor Websitenstart, also jedes Mal wenn Änderung im Code
        -> JSON Datei mit Array aus Alternative 1 oder noch besser nur mit Zutaten
        erstellen.
        - Nur die JSON mit fertigen Daten bei Start der Website fetchen.
        */

    let start = performance.now();

    // domCards.forEach wartet nicht auf await (async function) 
    for (let card of domCards) {
        let href = card.querySelector("a").href;
        let title = card.querySelector("a").innerHTML;
        let recipeText = await getRecipeText(href);
        indexCards.push(makeIndexCard(card, href, title, recipeText.toLocaleLowerCase()));
    }

    let end = performance.now();
    console.log(cardArr.length + " indexCards wurden innerhalb von " 
        + (end-start).toFixed(2) + " ms initialisiert.")
    /*console.log("Größe des Arrays: " + 
        (JSON.stringify(cardArr).length / 1000000).toFixed(2)
        + " MB");*/
}

async function getRecipeText(cardHref){
    let recipe = await fetch(cardHref);
    let innerHtml = await recipe.text();
    return innerHtml;
}

function changeRecipeListsVisibility (stateId){
    
    domRecipeLists.forEach(list => {
        if(stateId === "all" || stateId === list.id){
            // Wenn keine FLEXBOX mehr verwendet wird, hier anpassen.
            list.style.setProperty("display", "flex");
        }
        else{
            list.style.setProperty("display", "none");
        }
    })

    setTabBtnsActive(stateId);
}

function setTabBtnsActive(stateId){
    
    // setFavicon(stateId);

    if(stateId === "all"){
        tabBtns.forEach(b => b.querySelector(".bottomBarWrapper")
        .classList.add("active"));
    }
    else{
        let button = Array.from(tabBtns).find((item) => item.id == stateId);

        tabBtns.forEach(b => b.querySelector(".bottomBarWrapper")
            .classList.remove("active"));
        button.querySelector(".bottomBarWrapper")
            .classList.add("active");
    }
}

function setSearchBtnActive(setToActive){
    if(setToActive === true){
        searchBtn.querySelector(".bottomBarWrapper").classList.add("active");
    }
    else{
        searchBtn.querySelector(".bottomBarWrapper").classList.remove("active");
    }
}

function setSearchRecipeBtnActive(setActive){
    if(setActive === false){
        searchRecipeBtn.classList.remove("active");
        searchInput.placeholder = "Rezeptnamen suchen..."
    }
    else{
        searchRecipeBtn.classList.add("active");
        searchInput.placeholder = "Rezepttexte durchsuchen..."
    }
}

// Not in use, because it is confusing when recipe tabs are open.
// Than you cant differentiate between a recipe and the index-site.
function setFavicon(stateId){

    let favicon = document.querySelector("#favicon");
 
    let newIconPath;
    
    if(stateId == "all"){
        newIconPath = "images/small/Wappen_ohne_Hintergrund_300px height.png"    
    }
    else {
        /* stateId ist "meals", aber svgs "meal_color_01_svg"
        -> Das hintere "s" bzw. letzten Buchstaben entfernen*/
        newIconPath = "svg/" + stateId.slice(0,-1) + "_color_01.svg";
    }

    favicon.setAttribute("href", newIconPath);

}

function sortRecipeLists(divLists) {

    divLists.forEach(list => {
        let recipes = Array.from(list.querySelectorAll(".card"));

        recipes.sort((item1, item2) => {
            str1 = item1.querySelector("a").textContent;
            str2 = item2.querySelector("a").textContent;
            return str1.localeCompare(str2);
        });
        
        // appendChild only moves item, when the item exists in the array
        recipes.map((item) => list.appendChild(item));
    })

}

/*sortDivList();

function sortDivList() {

    // Dieser Code ist nur so lange gültig, bis eine eigene Unterseite für Getränke erstellt wurde.
    // Danach kann der auskommentierte Code darunter wieder verwendet werden.
    
    let recipes = Array.from(recipeListDiv.querySelectorAll(".card"));
    recipeListDiv.querySelectorAll(".card").forEach(card => card.remove());

    meals = recipes
    .filter((item1) => {
        str1 = item1.querySelector("a").textContent;
        return !str1.includes("Getränk -") && !str1.includes("Sauce -");
    })
    .sort((item1, item2) => {
        str1 = item1.querySelector("a").textContent;
        str2 = item2.querySelector("a").textContent;
        return str1.localeCompare(str2);
    })
    .map((item) => recipeListDiv.appendChild(item));
    
    sauces = recipes.filter((item1) => {
        str1 = item1.querySelector("a").textContent;
        return str1.includes("Sauce -");
    })
    .sort((item1, item2) => {
        str1 = item1.querySelector("a").textContent;
        str2 = item2.querySelector("a").textContent;
        return str1.localeCompare(str2);
    })
    .map((item) => recipeListDiv.appendChild(item));

    drinks = recipes.filter((item1) => {
        str1 = item1.querySelector("a").textContent;
        return str1.includes("Getränk -");
    })
    .sort((item1, item2) => {
        str1 = item1.querySelector("a").textContent;
        str2 = item2.querySelector("a").textContent;
        return str1.localeCompare(str2);
    })
    .map((item) => recipeListDiv.appendChild(item));

    /*Code ohne Getränke rauszufiltern.
    Ein Entfernen aller Elemente aus dem DOM ist dann ebenfalls nicht erforderlich.

    let recipes = Array.from(recipeListDiv.querySelectorAll(".card"));

    recipes.sort((item1, item2) => {
        str1 = item1.querySelector("a").textContent;
        str2 = item2.querySelector("a").textContent;
        return str1.localeCompare(str2);
    });

    recipes.map((item) => recipeListDiv.appendChild(item));
    */

//}