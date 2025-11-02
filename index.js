const recipeListDiv = document.querySelector("#recipe-list");

recipeListDiv.addEventListener("click", (event) => {
    window.location = event.target.querySelector("a").href;
});

sortDivList();

function sortDivList() {

    let recipes = Array.from(recipeListDiv.querySelectorAll(".card"));

    recipes.sort((item1, item2) => {
        str1 = item1.querySelector("a").textContent;
        str2 = item2.querySelector("a").textContent;
        return str1.localeCompare(str2);
    });

    recipes.map((item) => recipeListDiv.appendChild(item));

}

// const recipeListeUl = document.querySelector("#recipe-list");

// let recipes = Array.from(recipeListeUl.querySelectorAll("li"));

// recipes.sort((item1,item2) => {
//     str1 = item1.querySelector("a").textContent;
//     str2 = item2.querySelector("a").textContent;
//     return str1.localeCompare(str2);
// });

// recipes.map((item) => recipeListeUl.appendChild(item));