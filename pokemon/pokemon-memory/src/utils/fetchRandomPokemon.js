// helper function, not a component

const fetchRandomPokemon = async () => {
  // get a random pokemon from the pokeAPI
  const pokemon_index = Math.ceil(Math.random() * 898);
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_index}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default fetchRandomPokemon;