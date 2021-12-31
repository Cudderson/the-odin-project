// hooks
import { useState, useEffect } from "react";
// components
import PokemonCard from "./PokemonCard.js";
import Scoreboard from "./Scoreboard.js";
// utils
import fetchRandomPokemon from "./utils/fetchRandomPokemon.js";
import shuffleList from "./utils/shuffleList.js";
import styles from "./App.module.css";

function App() {
  const [level, setLevel] = useState(1);
  const [highestLevel, setHighestLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonFound, updatePokemonFound] = useState(new Set());

  useEffect(() => {
    // make sure container is hidden when new level begins
    determineVisibility("new_level");

    console.log("useEffect called");
    const pokemonRequired = level * 2 + 2;
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
    } else if (index === "new_level") {
      container.classList.remove(styles["show"]);
      container.classList.add(styles["hide"]);
    }
  };

  const handleClick = (e) => {
    const pokemonClicked = e.target.id;

    if (!pokemonFound.has(pokemonClicked)) {
      updatePokemonFound(pokemonFound.add(pokemonClicked));
      console.log(pokemonFound);
      if (pokemonFound.size === level * 2 + 2) {
        // update and trigger new level ***
        console.log("you won the level!");
        setLevel(level + 1)          
        // update highestLevel if needed
        // THIS STATE UPDATE ISNT RECORDED IN TIME
        if (level > highestLevel) {
          setHighestLevel(level);
        }

        return;
      }
    } else {
      const gameoverMessage = document.getElementById(styles["message"]);
      gameoverMessage.style.opacity = 1;
      gameoverMessage.textContent = `${pokemonClicked} has already been found!`;
      document.getElementById(styles["gameover"]).style.opacity = 1;
      console.log(`pokemonFound already has ${pokemonClicked}! Game Over!`);
      document.getElementById(pokemonClicked).style.background = "red";
      // turn off pointer events on container
      document.getElementById(styles["main-container"]).style.pointerEvents =
        "none";
      return;
    }

    // we should also shuffle the order in which the elements appear on screen
    setPokemonList(shuffleList(pokemonList));
  };

  const handleRestartGame = () => {
    window.location.reload();
    return false;
  };

  return (
    <div id={styles["wrapper"]}>
      <h3>Pokemon Memory</h3>
      <Scoreboard
        currentLevel={level}
        highestLevel={highestLevel}
        pokemonFound={pokemonFound.size === 0 ? 0 : pokemonFound.size}
        pokemonTotal={level * 2 + 2}
      />
      <div id={styles["gameover"]}>
        <h5 id={styles["message"]}>pikachu has already been found!</h5>
        <button onClick={handleRestartGame}>Restart Game</button>
      </div>
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
    </div>
  );
}

export default App;
