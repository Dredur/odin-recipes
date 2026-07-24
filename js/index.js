// const recipeListDiv = document.querySelector(".recipe-list");
const recipeLists = document.querySelectorAll(".recipe-list");

const bottomBarBtns = document.querySelectorAll(".bottom-bar button");

const TRANSITION_MS = 400;

// Damit wird der am nähesten befindliche Link getriggert, wenn in die recipeList geklickt wird.
// Ggf. bessere Variante für klicken von Cards implementieren.
recipeLists.forEach(list => {
    list.addEventListener("click", (event) => {
    window.location = event.target.querySelector("a").href;
});
})

bottomBarBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        setBottomBarWrapperActive(button.id);
        changeVisibleState(button.id);
    })

});

// Starting state
let startingState = "all"
changeVisibleState(startingState);
setBottomBarWrapperActive(startingState);

sortRecipeLists(recipeLists);


// --- FUNKTIONEN ---

function changeVisibleState (stateId){
    recipeLists.forEach(list => {
        if(stateId === "all" || stateId === list.id){
            // Wenn keine FLEXBOX mehr verwendet wird, hier anpassen.
            list.style.setProperty("display", "flex");
        }
        else{
            list.style.setProperty("display", "none");
        }
    })
}

function setBottomBarWrapperActive(stateId){
    
    if(stateId === "all"){
        bottomBarBtns.forEach(b => b.querySelector(".bottomBarWrapper")
        .classList.add("active"));
        return true;
    }
    else{
        let button = Array.from(bottomBarBtns).find((item) => item.id == stateId);

        bottomBarBtns.forEach(b => b.querySelector(".bottomBarWrapper")
            .classList.remove("active"));
        button.querySelector(".bottomBarWrapper")
            .classList.add("active");
    }
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