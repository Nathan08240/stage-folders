let pokemonData;
let spriteEl = document.getElementById("sprite");
let numberEl = document.getElementById("number");
let nameEl = document.getElementById("name");
let heightEl = document.getElementById("height");
let weightEl = document.getElementById("weight");
let statisticsEl = document.getElementById("statistics");
let skillsEl = document.getElementById("skills");
let formDataEl = document.getElementById("formData");
let searchEl = document.getElementById("search");
let rightEl = document.getElementById("right");
let leftEl = document.getElementById("left");

let API_URL = "https://pokeapi.co/api/v2/";

const fetchPokemon = async (pokemonName = "pikachu") => {
  let response = await fetch(API_URL + "pokemon/" + pokemonName);
  if (!response.ok) {
    alert("Pokemon name incorrect !");
    return;
  }

  pokemonData = await response.json();
  afficherPokemon();
};

function afficherPokemon() {
  if (!pokemonData) {
    console.error("Pas de data");
    return;
  }

  let { id, name, height, weight, sprites, stats, moves } = pokemonData;
  statisticsEl.innerHTML = "";
  stats.forEach((element) => {
    statisticsEl.innerHTML += `<span>${element.stat.name}: ${element.base_stat} </span>`;
  });

  skillsEl.innerHTML = "";
  moves.forEach((element) => {
    skillsEl.innerHTML += `<span>${element.move.name} </span>`;
  });

  nameEl.innerText = name;
  numberEl.innerText = `#${id}`;
  spriteEl.src = sprites.other["official-artwork"].front_shiny;
  heightEl.innerText = `Height : ${height / 10} m`;
  weightEl.innerText = `Weight : ${weight / 10} kg`;
}

fetchPokemon();

formDataEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = searchEl.value.trim();
  if (!inputValue) {
    alert("Please enter a pokemon name !");
    return;
  }

  fetchPokemon(inputValue.toLowerCase());
});

rightEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (pokemonData && pokemonData.id < 1025) {
    fetchPokemon(pokemonData.id + 1);
  }
});

leftEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (pokemonData && pokemonData.id > 1) {
    fetchPokemon(pokemonData.id - 1);
  }
});
