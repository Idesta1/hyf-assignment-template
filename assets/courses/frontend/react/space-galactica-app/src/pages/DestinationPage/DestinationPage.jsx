import { useState } from "react";
import styles from "./DestinationPage.module.css";
import PlanetCard from "./PlanetCard";

const planetsData = [
  {
    name: "Europa",
    description:
      "Europa, one of Jupiter’s moons, is an icy world with a hidden ocean beneath its surface. This mysterious moon is a prime candidate for the search for extraterrestrial life, making it a thrilling destination for space explorers.",
    thumbnail: "/destination/image-europa.png",
  },
  {
    name: "Mars",
    description:
      "Mars, the Red Planet, is a barren yet fascinating world with vast deserts, towering volcanoes, and the deepest canyon in the solar system. As humanity’s next frontier, Mars invites us to dream of colonization and the possibilities of life beyond Earth.",
    thumbnail: "/destination/image-mars.png",
  },
  {
    name: "Moon",
    description:
      "Our closest celestial neighbor, the Moon, is a silent witness to Earth's history. With its stunning craters and desolate landscapes, the Moon offers a unique glimpse into space exploration's past and future, making it a perfect destination for lunar adventurers.",
    thumbnail: "/destination/image-moon.png",
  },
  {
    name: "Titan",
    description:
      "Titan, Saturn's largest moon, is a world of dense atmosphere and liquid methane lakes. This enigmatic moon is shrouded in a thick orange haze, concealing a landscape that is both alien and strangely familiar, beckoning explorers to uncover its secrets.",
    thumbnail: "/destination/image-titan.png",
  },
];

const PlanetsWishlistItem = ({ name, thumbnail, onRemove }) => {
  return (
    <div className={styles.wishlistItem}>
      <img className={styles.wishlistItemThumbnail} src={thumbnail} alt="" />
      <b>{name.toUpperCase()}</b>
      <button onClick={onRemove}>remove</button>
    </div>
  );
};

export const Destinations = () => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const isPlanetInWishlist = (planetName) => {
    return planetsWishlist.some((planet) => planet.name === planetName);
  };

  const togglePlanetSelection = (name, thumbnail) => {
    if (isPlanetInWishlist(name)) {
      removePlanetFromWishlist(name);
    } else {
      addPlanetToWishlist(name, thumbnail);
    }
  };

  const addPlanetToWishlist = (name, thumbnail) => {
    setPlanetsWishlist((prevWishlist) => [
      ...prevWishlist,
      { name, thumbnail },
    ]);
  };
  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist((prevWishlist) =>
      prevWishlist.filter((planet) => planet.name !== name),
    );
  };

  const wishlistCount = planetsWishlist.length;

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Travel Destinations</h1>
        <section className="card">
          <h2>WishList</h2>

          {wishlistCount === 0 ? (
            <p>
              No planets in your wishlist{" "}
              <span className={styles.astroIcon}>👩🏽‍🚀</span>
            </p>
          ) : (
            <p>
              You have{" "}
              <strong className={styles.wishlistCount}>{wishlistCount}</strong>{" "}
              planets in your wishlist
            </p>
          )}

          {/* 🧑🏽‍🚀 Task - Week 3 */}
          {/* Use the AddWishlistItem component here. */}

          {/* 🧑🏽‍🚀 Task - Week 3
          <h3>Your current wishlist</h3>
          <div className={styles.wishlistList}>
            ...
            Use .map() to display the wishlist planets with the PlanetsWishlistItem component. 
          </div> 
          */}
        </section>
        <section className="card">
          <h2>Possible Destinations</h2>
          {planetsData.map((planet) => (
            <PlanetCard
              key={planet.name}
              name={planet.name}
              description={planet.description}
              thumbnail={planet.thumbnail}
              isSelected={isPlanetInWishlist(planet.name)}
              togglePlanetSelection={togglePlanetSelection}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Destinations;

// 🧑🏽‍🚀 Task - Week 4 - part 2
// Hate to break it to you, but you will have to make some changes to the code you already wrote.
// Now that you have context, grab and use the context data in this.
// You will need to replace some of the variables and functions with the ones from the context.
