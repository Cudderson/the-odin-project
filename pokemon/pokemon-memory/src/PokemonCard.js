// this will be a component that renders a pokemon with and image and name

import { useState, useEffect } from "react";
import fetchRandomPokemon from "./utils/fetchRandomPokemon";
import styles from "./PokemonCard.module.css";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // async IIFE
    (async () => {
      const fetchedPokemon = await fetchRandomPokemon();
      // this state change will re-render component
      setPokemon(fetchedPokemon);
    })();
  }, []);

  function displayCard (pokemonToDisplayId) {
    // display card after image has been loaded
    document.getElementById(pokemonToDisplayId).classList.remove(styles['hide']);
  }

  return (
    pokemon ? (
      <div id={pokemon.name} className={[styles['card-container'], styles['hide']].join(' ')}>
        <img onLoad={() => displayCard(pokemon.name)} src={pokemon.sprites.front_default} alt=""></img>
        <span>{pokemon.name}</span>
      </div>
    ) : null
  );
};

export default PokemonCard;
