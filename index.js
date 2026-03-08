const recipeListDiv = document.querySelector("#recipe-list");

recipeListDiv.addEventListener("click", (event) => {
    window.location = event.target.querySelector("a").href;
});

sortDivList();

function sortDivList() {

    // Dieser Code ist nur so lange gültig, bis eine eigene Unterseite für Getränke erstellt wurde.
    // Danach kann der auskommentierte Code darunter wieder verwendet werden.
    
    let recipes = Array.from(recipeListDiv.querySelectorAll(".card"));
    recipeListDiv.querySelectorAll(".card").forEach(card => card.remove());

    meals = recipes
    .filter((item1) => {
        str1 = item1.querySelector("a").textContent;
        return !str1.includes("Getränk -");
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

}

// const recipeListeUl = document.querySelector("#recipe-list");

// let recipes = Array.from(recipeListeUl.querySelectorAll("li"));

// recipes.sort((item1,item2) => {
//     str1 = item1.querySelector("a").textContent;
//     str2 = item2.querySelector("a").textContent;
//     return str1.localeCompare(str2);
// });

// recipes.map((item) => recipeListeUl.appendChild(item));