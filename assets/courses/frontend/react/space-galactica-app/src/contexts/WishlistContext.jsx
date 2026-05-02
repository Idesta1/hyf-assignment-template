import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
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
    <WishlistContext.Provider
      value={{
        planetsWishlist,
        wishlistCount,
        isPlanetInWishlist,
        togglePlanetSelection,
        addPlanetToWishlist,
        removePlanetFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
