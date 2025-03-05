
let data = [];
let rech = document.querySelector(".text");
let searchInput = document.getElementById("search");
let barree = document.querySelector(".bar");
let numDisplay = document.querySelector(".number");
let lez = document.getElementById("lez");
let boite = document.querySelector(".box");
let triCroissantBtn = document.querySelector("#Tricroissant");
let triDecroissantBtn = document.querySelector("#Tridecroissant");
let triAlphaBtn = document.querySelector("#TriAlphabetique");

rech.addEventListener("click", () => {
    rech.classList.toggle("texte");
});

lez.addEventListener("input", () => {
    numDisplay.textContent = lez.value;
    numDisplay.style.color = "green";
    numDisplay.style.fontWeight = "bold";
    filtrerParPopulation(lez.value);
});

async function affichageTableau() {
    let response = await fetch("https://restcountries.com/v3.1/all");
    data = await response.json(); 
    console.log(data); 
    affichageDonnees(data);
}

function affichageDonnees(data) {
    boite.innerHTML = data.map((pays) => {
        return `
            <div class="country">
                <img src="${pays.flags.svg}" alt="Flag of ${pays.name.common}" class="img" />
                <h3 class="name">${pays.name.common}</h3>
                <p class="para">Region: ${pays.region}</p>
                <p class="paradis">Cap: ${pays.capital}</p>
                <p class="num">Devis: ${pays.currencies ? Object.values(pays.currencies)[0].name : ""}</p>
                <p class="origin">Population: ${pays.population}</p>
            </div>
        `;
    }).join('');
}

window.addEventListener("load", affichageTableau);

function triCroissant() {
    let sortedData = [...data].sort((a, b) => a.population - b.population); 
    affichageDonnees(sortedData);
}

function triDecroissant() {
    let sortedData = [...data].sort((a, b) => b.population - a.population); 
    affichageDonnees(sortedData);
}

function triAlphabetique() {
    let sortedData = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
    affichageDonnees(sortedData);
}

triCroissantBtn.addEventListener("click", triCroissant);
triDecroissantBtn.addEventListener("click", triDecroissant);
triAlphaBtn.addEventListener("click", triAlphabetique);

function rechercherPays() {
   let searchval = searchInput.value.toLowerCase();
   let filtereData = data.filter(pays => pays.name.common.toLowerCase().includes(searchval));
   affichageDonnees(filtereData);
}

searchInput.addEventListener("input", rechercherPays);

function filtrerParPopulation(valeur) {
   let filteredData;
   if (valeur == 0) {
       filteredData = []; 
   } else {
       filteredData = data.slice(0, valeur); 
   }
   affichageDonnees(filteredData);
}