// Authorization Token
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDA5NmM3NzM1M2I5OTFlNzlhZWZhMzJkMzc1NDc2NCIsIm5iZiI6MTczMzIxNDU4MC4xNCwic3ViIjoiNjc0ZWMxNzQ3OTliYzA0NzJkZWVhNjgwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KJIvTK6gNCgpJNKw2i3ecXIT5SczGO-InrhIvZNrmEg",
  },
};

// Fetch POPULAR Movies, page 1, 20 results
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));

// SEARCH for a Movie title, page 1, 20 results

const searchButtonEl = document.getElementById("search-button");
searchButtonEl.addEventListener("click", () => {
  const searchMovieEl = document.getElementById("search-movie");
  const queryMovieTitle = () => searchMovieEl.value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${queryMovieTitle()}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      const searchResultsContainerEl =
        document.getElementById("search-container");
      res.results.forEach((movie) => {
        const imgPath = `https://image.tmdb.org/t/p/w200${movie.poster_path})`;
        // console.log(movie.title, movie.release_date.slice(0, 4), imgPath);
        const movieUl = document.createElement("ul");
        movieUl.className = "flex flex-col items-center w-48 m-2";
        movieUl.innerHTML = `
          <li><img class="object-cover h-60 w-40 rounded-lg pb-2" src="${imgPath}" alt="Image of ${
          movie.title
        }"></li>
          <li>${movie.title} (${movie.release_date.slice(0, 4)})</li>
        `;
        searchResultsContainerEl.appendChild(movieUl);
      });
    })

    .catch((err) => console.error(err));
});
