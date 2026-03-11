const movies = [];

fetch("./movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies.push(...data);
    console.log(movies);

    // add tags to movies after the array is populated with data from the JSON file
    const movieWithTag = movies.map((movie) => {
      console.log("Processing movie:", movie);
      let tag;
      if (movie.rating >= 7) {
        tag = "Good";
      } else if (movie.rating >= 4 && movie.rating < 7) {
        tag = "Average";
      } else {
        tag = "Bad";
      }
      console.log(
        `Movie: ${movie.title}, Rating: ${movie.rating}, Tag: ${tag}`,
      );
      return {
        ...movie,
        tag: tag, // Add the tag property to the movie object
      };
    });

    console.log(movieWithTag);
    // filter and map movies with rating >= 6 to get their ratings
    const higherRatedMovies = movieWithTag
      .filter((movie) => movie.rating >= 6)
      .map((movie) => movie.rating);

    console.log("Ratings of movies with rating >= 6:", higherRatedMovies);
  })
  .catch((error) => console.error("Error fetching movies:", error));

document.addEventListener("DOMContentLoaded", () => {
  const shortBtn = document.getElementById("short-btn");
  const longBtn = document.getElementById("long-btn");
  const movieList = document.getElementById("movies-list");
  const startYearInput = document.getElementById("start-year");
  const endYearInput = document.getElementById("end-year");
  const countMoviesBtn = document.getElementById("count-movies-btn");
  const movieCountDiv = document.getElementById("movie-count");

  function displayMovies(movies, limit = 21) {
    movieList.innerHTML = "";
    movies.slice(0, limit).forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.textContent = `${movie.title} (${movie.year}) `;
      movieList.appendChild(movieItem);
    });
  }

  shortBtn.addEventListener("click", () => {
    const shortTitleMovies = movies.filter((movie) => movie.title.length <= 10);
    displayMovies(shortTitleMovies);
  });

  //console.log(shortMovies);
  longBtn.addEventListener("click", () => {
    const longTitleMovies = movies.filter((movie) => movie.title.length > 10);
    displayMovies(longTitleMovies);
  });

  //counting number of movies made between 1980-1989
  function countMoviesByYearRange(startYear, endYear) {
    const moviesInRange = movies.filter(
      (movie) => movie.year >= startYear && movie.year <= endYear,
    );
    return moviesInRange.length;
  }

  //   const movies80s = movies.filter(
  //     (movie) => movie.year >= 1980 && movie.year <= 1989,
  //   );
  //   console.log(`Number of movies made between 1980-1989: ${movies80s.length}`);
  // });
  countMoviesBtn.addEventListener("click", () => {
    const startYear = parseInt(startYearInput.value);
    const endYear = parseInt(endYearInput.value);

    if (isNaN(startYear) || isNaN(endYear)) {
      movieCountDiv.textContent = "Please enter valid start and end years.";
      return;
    }

    const count = countMoviesByYearRange(startYear, endYear);
    movieCountDiv.textContent = `Number of movies made between ${startYear}-${endYear}: ${count}`;
  });

  function displayMoviesByKeyword(keyword) {
    const moviesWithKeyword = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    displayMovies(moviesWithKeyword);
  }

  const keywordInput = document.getElementById("keyword-input");
  const searchBtn = document.getElementById("keyword-btn");
  

  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const keyword = keywordInput.value.trim();
    if (keyword === "") {
      alert("Please enter a keyword to search.");
      return;
    }
    displayMoviesByKeyword(keyword);
  });
});
