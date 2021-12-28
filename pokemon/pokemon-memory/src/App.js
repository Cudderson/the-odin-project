import PokemonCard from './PokemonCard.js'; 
import styles from './App.module.css';
import { useState, useEffect } from 'react';

function App() {
  const [level, setLevel] = useState(1);
  const [pokemonList, setPokemonList] = useState(null);
  
  useEffect(() => {
    // on initial render, should fetch pokemon for level 1
    const pokemonRequired = (level * 2) + 2;
    const tempList = [];

    for (let i = 0; i < pokemonRequired; i++) {
      const card = <PokemonCard />;
      tempList.push(card);
    }

    setPokemonList(tempList);
  }, [level]);

  const checkComplete = (index) => {
    const container = document.getElementById(styles['main-container']);

    if (index === container.children.length - 1) {
      container.classList.remove(styles['hide']);
      container.classList.add(styles['show']);
    }
  }

  return (
    <ul id={styles['main-container']} className={styles['hide']}>
      {pokemonList ? pokemonList.map((pokeCard, index) => {
        return <li onLoad={() => checkComplete(index)} key={index}>{pokeCard}</li>
      }) : null}
    </ul>
  );
}

export default App;
