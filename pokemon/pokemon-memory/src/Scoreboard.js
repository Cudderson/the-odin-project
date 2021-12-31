import styles from "./Scoreboard.module.css";

const Scoreboard = (props) => {
  return (
    <div id={styles["scoreboard"]}>
      <h4>
        Current Level: <span>{props.currentLevel} ({props.pokemonFound}/{props.pokemonTotal})</span>
      </h4>
      <h4>
        Highest Level Reached: <span>{props.highestLevel}</span>
      </h4>
    </div>
  );
};

export default Scoreboard;
