// const recipeListDiv = document.querySelector(".recipe-list");
const headerWappenImg = document.querySelector(".header #wappen");

const recipeLists = document.querySelectorAll(".recipe-list");
const allCards = document.querySelectorAll(".recipe-list>.card");

const bottomBar = document.querySelector(".bottom-bar");
const bottomBarBtns = bottomBar.querySelectorAll("button");
const tabBtns = Array.from(bottomBarBtns).filter((current) => current.id !== "search");
const searchBtn = Array.from(bottomBarBtns).filter((current) => current.id === "search")[0];

const searchBar = document.querySelector(".search-bar");
const searchInput = searchBar.querySelector("#searchInput");
const searchCloseBtn = searchBar.querySelector("#searchCloseBtn");

const TRANSITION_MS = 400;

let currentState = "meals";


// --- Starting state ---

searchBar.style.setProperty("bottom", bottomBar.offsetHeight + "px");

changeRecipeListsVisibility(currentState);

sortRecipeLists(recipeLists);

// recipeLists.forEach((list) => {
//     list.forEach((card) => {
//         allCards.add(card);
//     })
// });


// --- Event-Listeners ---

headerWappenImg.addEventListener("click", (event) => {
    changeRecipeListsVisibility("all");
});

// Damit wird der am nähesten befindliche Link getriggert, wenn in die recipeList geklickt wird.
// Ggf. bessere Variante für klicken von Cards implementieren.
recipeLists.forEach(list => {
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
    allCards.forEach((card) => {
        card.style.setProperty("display", "flex");
    })
})

searchInput.addEventListener("keyup", (event) => {
    let inputText = searchInput.value.toLowerCase();
    console.log(inputText);
    allCards.forEach((card) => {
        if(card.querySelector("a").innerHTML.toLowerCase().includes(inputText)){
            card.style.setProperty("display", "flex");
        }
        else{
            card.style.setProperty("display", "none");
        }
    });
});

// --- FUNKTIONEN ---

function changeRecipeListsVisibility (stateId){
    
    recipeLists.forEach(list => {
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