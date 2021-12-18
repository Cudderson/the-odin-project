// pokemon api: https://pokeapi.co/api/v2/

// current: should modularize this for readability


// factory function
const Pokemon = (data) => {
  const name = capitalizeName(data.name);
  const avatar = data.sprites.front_default;
  return { name, avatar };
};

function capitalizeName(name) {
  const first_letter = name.charAt(0).toUpperCase();
  const new_name = first_letter + name.slice(1);
  return new_name;
}

async function getRandomPokemon() {
  try {
    const pokemon_index = Math.ceil(Math.random() * 898);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon_index}`,
      { mode: "cors" }
    );
    const data = await response.json();
    // construct Pokemon object
    const pokemon = Pokemon(data);
    return pokemon;
  } catch (error) {
    console.log(error);
  }
}

// get transition name to ensure it will work on all browsers
function transitionEndEventName() {
  var i,
    undefined,
    el = document.createElement("div"),
    transitions = {
      transition: "transitionend",
      OTransition: "otransitionend", // oTransitionEnd in very old Opera
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
    };

  for (i in transitions) {
    if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
      return transitions[i];
    }
  }

  //TODO: throw 'TransitionEnd event is not supported in this browser';
}

function init() {
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
}

init();
const getPokemonBtn = document.getElementById("fetch-pokemon");
const containerInner = document.getElementById("container-inner");
const allPokemon = document.getElementsByClassName("container-poke");

const transitionEnd = transitionEndEventName();
containerInner.addEventListener(transitionEnd, () => {
  if (containerInner.classList.contains('hide')) {
    displayPokemon().then(() => toggleVisibility());
  }
});

async function displayPokemon() {
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
  console.log("pokemon retrieved!!!")
}

async function toggleVisibility() {
  containerInner.classList.toggle("hide");
}

getPokemonBtn.addEventListener("click", toggleVisibility);