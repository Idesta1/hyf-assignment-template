import styles from "./RoverPhoto.module.css";

export default function RoverPhoto({ src, date, roverName }) {
  return (
    <article className={styles.roverCard}>
      <div className={styles.imageWrap}>
        <img
          className={styles.roverImage}
          src={src}
          alt={`Rover ${roverName} - ${date}`}
        />
      </div>
      <p className={styles.meta}>{`Rover: ${roverName}`}</p>
      <p className={styles.meta}>{`Date: ${date}`}</p>
    </article>
  );
}
