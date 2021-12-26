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

  return (
    pokemon ? (
      <div className={styles['card-container']}>
        <img src={pokemon.sprites.front_default} alt=""></img>
        <span>{pokemon.name}</span>
      </div>
    ) : null

    // use the conditional logic above to only render a card when the entire pokemon is ready
  );
};

export default PokemonCard;
