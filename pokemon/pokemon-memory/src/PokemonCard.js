import styles from "./PokemonCard.module.css";

const PokemonCard = ({pokemonData}) => {

  function displayCard (pokemonToDisplayId) {
    // display card after image has been loaded
    document.getElementById(pokemonToDisplayId).classList.remove(styles['hide']);
  }

  return (
    pokemonData ? (
      <div id={pokemonData.name} className={[styles['card-container'], styles['hide']].join(' ')}>
        <img onLoad={() => displayCard(pokemonData.name)} src={pokemonData.sprites.front_default} alt=""></img>
        <span>{pokemonData.name}</span>
      </div>
    ) : null
  );
};

export default PokemonCard;
