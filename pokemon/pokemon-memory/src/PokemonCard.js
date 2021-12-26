// this will be a component that renders a pokemon with and image and name

import { useState, useEffect } from "react";
import fetchRandomPokemon from "./utils/fetchRandomPokemon";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // async IIFE
    (async() => {
      const fetchedPokemon = await fetchRandomPokemon();
      setPokemon(fetchedPokemon);
    })();
  }, []);

  return (
    <div>
      {
        pokemon ? pokemon.name : null
      }
    </div>
  )
}

export default PokemonCard;