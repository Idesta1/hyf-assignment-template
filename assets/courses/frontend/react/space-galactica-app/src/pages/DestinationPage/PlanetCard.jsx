import styles from "./DestinationPage.module.css";

const PlanetCard = ({
  name,
  description,
  thumbnail,
  isSelected,
  togglePlanetSelection,
}) => {
  return (
    <div className={styles.planetCard}>
      <img className={styles.planetThumbnail} src={thumbnail} alt="" />
      <div className={styles.planetDescription}>
        <h2>
          <span style={{ letterSpacing: "0.08em" }}>{name.toUpperCase()}</span>
          {isSelected ? "- SELECTED" : ""}
        </h2>
        <p>{description}</p>
      </div>
      <button
        className="roundButton"
        onClick={() => togglePlanetSelection(name, thumbnail)}
      >
        {isSelected ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
      </button>
    </div>
  );
};

export default PlanetCard;
