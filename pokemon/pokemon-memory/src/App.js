import PokemonCard from "./PokemonCard.js";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import fetchRandomPokemon from "./utils/fetchRandomPokemon.js";
import shuffleList from './utils/shuffleList.js';

function App() {
  const [level, setLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFound, updatePokemonFound] = useState(new Set());

  useEffect(() => {
    // make sure container is hidden when new level begins
    determineVisibility('new_level');

    console.log("useEffect called");
    const pokemonRequired = (level * 2) + 2;
    const tempList = [];

    updatePokemonFound(new Set());

    // async IIFE
    (async () => {
      for (let i = 0; i < pokemonRequired; i++) {
        const pokemonData = await fetchRandomPokemon();
        tempList.push(pokemonData);
      }

      setPokemonList(tempList);
    })();
  }, [level]);

  const determineVisibility = (index) => {
    const container = document.getElementById(styles["main-container"]);

    if (index === container.children.length - 1) {
      container.classList.remove(styles["hide"]);
      container.classList.add(styles["show"]);
    }
    else if (index === 'new_level') {
      container.classList.remove(styles['show']);
      container.classList.add(styles['hide']);
    }
  };

  const handleClick = (e) => {
    const pokemonClicked = e.target.id;

    if (!pokemonFound.has(pokemonClicked)) {
      updatePokemonFound(pokemonFound.add(pokemonClicked));
      console.log(pokemonFound);
      if (pokemonFound.size === (level * 2) + 2) {
        
        // player wins the level
        console.log("you won the level!");

        // update and trigger new level ***
        setLevel(level + 1);
        return;
      }
    } 
    else {
      console.log(`pokemonFound already has ${pokemonClicked}! Game Over!`);
      document.getElementById(pokemonClicked).style.background = 'red';
      return; // this should also trigger something (TODO)
    }

    // we should also shuffle the order in which the elements appear on screen
    setPokemonList(shuffleList(pokemonList));
  };

  return (
    <ul id={styles["main-container"]} className={styles["hide"]}>
      {pokemonList
        ? pokemonList.map((pokeData, index) => {
            return (
              <li
                onClick={handleClick}
                onLoad={() => determineVisibility(index)}
                key={index}
              >
                <PokemonCard pokemonData={pokeData} />
              </li>
            );
          })
        : null}
    </ul>
  );
}

export default App;
