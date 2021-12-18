// pokemon api: https://pokeapi.co/api/v2/

// current: should modularize this for readability

// factory function version
// const Pokemon = (data) => {
//   const name = capitalizeName(data.name);
//   const avatar = data.sprites.front_default;
//   return { name, avatar };
// };

// constructor version
function Pokemon(data) {
  this.name = data.name;
  this.avatar = data.sprites.front_default;
}

Pokemon.prototype.capitalizeName = function() {
  const first_letter = this.name.charAt(0).toUpperCase();
  const new_name = first_letter + this.name.slice(1);
  this.name = new_name;
}

// same function as above, no attachment to constructor
// function capitalizeName(name) {
//   const first_letter = name.charAt(0).toUpperCase();
//   const new_name = first_letter + name.slice(1);
//   return new_name;
// }

async function getRandomPokemon() {
  try {
    const pokemon_index = Math.ceil(Math.random() * 898);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_index}`,
      { mode: "cors" }
    );
    const data = await response.json();

    // construct Pokemon object
    const pokemon = new Pokemon(data);
    pokemon.capitalizeName();

    return pokemon;

  } catch (error) {
    console.log(error);
  }
}

async function displayPokemon(allPokemon) {
  for (let i = 0; i < 6; i++) {
    const pokemon_object = await getRandomPokemon();

    allPokemon[i].getElementsByTagName("span")[0].textContent = pokemon_object.name;

    const pokemon_avatar = allPokemon[i].getElementsByTagName("img")[0];
    pokemon_avatar.src = pokemon_object.avatar;

    // only await on last image
    if (i === 5) {
      await new Promise((resolve) => {
        pokemon_avatar.onload = resolve;
      });
    }
  }
}

function addListeners() {
  const containerInner = document.getElementById("container-inner");
  const getPokemonBtn = document.getElementById("fetch-pokemon");
  const pokemonContainers = document.getElementsByClassName("container-poke");

  // generate new pokemon when container is hidden, then show when complete
  containerInner.addEventListener('transitionend', () => {
    if (containerInner.classList.contains("hide")) {
      displayPokemon(pokemonContainers).then(() => {
        containerInner.classList.toggle("hide");
      });
    }
  });

  // clicking button triggers transition event
  getPokemonBtn.addEventListener("click", async () => {
    containerInner.classList.toggle("hide");
  });
}

// IIFE
(function initializeDOMElements() {
  const container_inner = document.getElementById("container-inner");

  for (let i = 0; i < 6; i++) {
    const pokemon_div = document.createElement("div");
    pokemon_div.classList.add("container-poke");

    // add image and span
    const image = document.createElement("img");
    image.classList.add("poke-image");
    const span = document.createElement("span");
    span.classList.add("poke-name");
    span.textContent = "-";

    pokemon_div.appendChild(image);
    pokemon_div.appendChild(span);

    container_inner.appendChild(pokemon_div);
  }

  // add listeners to DOM elements
  addListeners();
})();

// initializeDOMElements();