const movies = [];

fetch("./movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies.push(...data);

    const movieWithTag = movies.map((movie) => {
      let tag;
      if (movie.rating >= 7) {
        tag = "Good";
      } else if (movie.rating >= 4 && movie.rating < 7) {
        tag = "Average";
      } else {
        tag = "Bad";
      }
      return {
        ...movie,
        tag: tag,
      };
    });

    const higherRatedMovies = movieWithTag
      .filter((movie) => movie.rating >= 6)
      .map((movie) => movie.rating);

    const movieCounts = movieWithTag.reduce(
      (counts, movie) => {
        if (movie.tag === "Good") {
          counts.good++;
        } else if (movie.tag === "Average") {
          counts.average++;
        } else if (movie.tag === "Bad") {
          counts.bad++;
        }
        return counts;
      },
      { good: 0, average: 0, bad: 0 },
    );

    document.getElementById("good-movie-count").textContent = movieCounts.good;
    document.getElementById("average-movie-count").textContent =
      movieCounts.average;
    document.getElementById("bad-movie-count").textContent = movieCounts.bad;

    const moviesWithDuplicatedWords = movies.filter((movie) =>
      hasDuplicatedWord(movie.title),
    );

    console.log(
      "Movies with duplicated words in the title:",
      moviesWithDuplicatedWords,
    );

    function hasDuplicatedWord(title) {
      if (!title) return false; // Handle empty titles
      const words = title
        .toLowerCase()
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(" ");
      const wordSet = new Set();

      for (const word of words) {
        if (wordSet.has(word)) {
          return true; // Found a duplicated word
        }
        wordSet.add(word);
      }
      return false; // No duplicated words found
    }
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
    if (movies.length === 0) {
      movieList.textContent = "No movies found.";
      return;
    }
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

  longBtn.addEventListener("click", () => {
    const longTitleMovies = movies.filter((movie) => movie.title.length > 10);
    displayMovies(longTitleMovies);
  });

  function countMoviesByYearRange(startYear, endYear) {
    const moviesInRange = movies.filter(
      (movie) => movie.year >= startYear && movie.year <= endYear,
    );
    return moviesInRange.length;
  }

  countMoviesBtn.addEventListener("click", () => {
    const startYear = parseInt(startYearInput.value);
    const endYear = parseInt(endYearInput.value);

    if (isNaN(startYear) || isNaN(endYear)) {
      movieCountDiv.textContent = "Please enter valid start and end years.";
      return;
    }

    if (startYear > endYear) {
      movieCountDiv.textContent = "Start year cannot be greater than end year.";
      return;
    }

    const count = countMoviesByYearRange(startYear, endYear);
    movieCountDiv.textContent = `Number of movies made between ${startYear}-${endYear}: ${count}`;
  });

  function displayMoviesByKeyword(keyword) {
    const moviesWithKeyword = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    if (moviesWithKeyword.length === 0) {
      alert(`No movies found with the keyword "${keyword}".`);
      return;
    }
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
