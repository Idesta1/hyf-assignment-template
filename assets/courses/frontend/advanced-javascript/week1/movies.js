const movies = [
  { title: "'71", year: 2014, rating: 7.2, votes: 41702, running_times: 5940 },
  {
    title: "'A' gai wak",
    year: 1983,
    rating: 7.4,
    votes: 11942,
    running_times: 6300,
  },
  {
    title: "'Breaker' Morant",
    year: 1980,
    rating: 7.9,
    votes: 10702,
    running_times: 6420,
  },
  {
    title: "'Crocodile' Dundee II",
    year: 1988,
    rating: 5.5,
    votes: 47180,
    running_times: 6480,
  },
  {
    title: "(500) Days of Summer",
    year: 2009,
    rating: 7.7,
    votes: 412368,
    running_times: 5700,
  },
  {
    title: "*batteries not included",
    year: 1987,
    rating: 6.6,
    votes: 25636,
    running_times: 6360,
  },
  {
    title: "...E tu vivrai nel terrore! L'aldilà",
    year: 1981,
    rating: 6.9,
    votes: 16484,
    running_times: 5220,
  },
  {
    title: "...and justice for all.",
    year: 1979,
    rating: 7.4,
    votes: 25408,
    running_times: 7140,
  },
  { title: "10", year: 1979, rating: 6, votes: 13152, running_times: 7320 },
  {
    title: "10 Cloverfield Lane",
    year: 2016,
    rating: 7.2,
    votes: 216151,
    running_times: 6240,
  },
  {
    title: "Zwartboek",
    year: 2006,
    rating: 7.8,
    votes: 64568,
    running_times: 8700,
  },
  {
    title: "eXistenZ",
    year: 1999,
    rating: 6.8,
    votes: 82881,
    running_times: 6900,
  },
  { title: "iBoy", year: 2017, rating: 6, votes: 12217, running_times: 5400 },
  { title: "xXx", year: 2002, rating: 5.8, votes: 157358, running_times: 7920 },
  {
    title: "xXx: Return of Xander Cage",
    year: 2017,
    rating: 5.2,
    votes: 63918,
    running_times: 6420,
  },
  {
    title: "xXx: State of the Union",
    year: 2005,
    rating: 4.4,
    votes: 59449,
    running_times: 6060,
  },
  {
    title: "¡Three Amigos!",
    year: 1986,
    rating: 6.4,
    votes: 58003,
    running_times: 6240,
  },
  {
    title: "À bout de souffle",
    year: 1960,
    rating: 7.9,
    votes: 58379,
    running_times: 5400,
  },
  {
    title: "Æon Flux",
    year: 2005,
    rating: 5.5,
    votes: 115131,
    running_times: 5580,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const shortBtn = document.getElementById("short-btn");
  const longBtn = document.getElementById("long-btn");
  const movieList = document.getElementById("movies-list");

  function displayMovies(movies) {
    movieList.innerHTML = "";
    movies.forEach((movie) => {
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
});
