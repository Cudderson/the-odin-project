import PokemonCard from "./PokemonCard.js";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import fetchRandomPokemon from "./utils/fetchRandomPokemon.js";

function App() {
  const [level, setLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFound, updatePokemonFound] = useState(new Set());

  useEffect(() => {
    console.log("useEffect called");
    const pokemonRequired = (level * 2) + 2;
    const tempList = [];

    // async IIFE
    (async () => {
      for (let i = 0; i < pokemonRequired; i++) {
        const pokemonData = await fetchRandomPokemon();
        tempList.push(pokemonData);
      }

      setPokemonList(tempList);
    })();
  }, [level]);

  const checkComplete = (index) => {
    const container = document.getElementById(styles["main-container"]);

    if (index === container.children.length - 1) {
      container.classList.remove(styles["hide"]);
      container.classList.add(styles["show"]);
    }
  };

  const shuffleList = () => {
    // modern Fisher-Yates algorithm
    let arr = [...pokemonList];
    let right = arr.length - 1;

    while (right > 0) {
      let index = Math.floor(Math.random() * right);
      let temp = arr[index];
      arr[index] = arr[right];
      arr[right] = temp;
      right--;
    }

    setPokemonList(arr);
  };

  const handleClick = (e) => {
    const pokemonClicked = e.target.id;

    if (!pokemonFound.has(pokemonClicked)) {
      updatePokemonFound(pokemonFound.add(pokemonClicked));
      console.log(pokemonFound);
      if (pokemonFound.size === (level * 2) + 2) {
        // player wins the level
        console.log("you won the level!");
        return; // this will trigger the next step (new level)
      }
    } 
    else {
      console.log(`pokemonFound already has ${pokemonClicked}! Game Over!`);
      document.getElementById(pokemonClicked).style.background = 'red';
      return; // this should also trigger something
    }

    // we should also shuffle the order in which the elements appear on screen
    shuffleList();
  };

  return (
    <ul id={styles["main-container"]} className={styles["hide"]}>
      {pokemonList
        ? pokemonList.map((pokeData, index) => {
            return (
              <li
                onClick={handleClick}
                onLoad={() => checkComplete(index)}
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
