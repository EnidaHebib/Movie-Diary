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

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-movie");
const searchResultsContainerEl = document.getElementById("search-container");
const clearButton = document.getElementById("clear-button");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const queryMovieTitle = searchInput.value;

  // Clear previous results
  searchResultsContainerEl.innerHTML = "";

  // Fetch new search results
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${queryMovieTitle}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.results.length === 0) {
        // Display "No results found" message
        const noResultsMessage = document.createElement("p");
        noResultsMessage.className = "text-center text-gray-400 text-lg mt-4";
        noResultsMessage.textContent =
          "No results found. Please try another search.";
        searchResultsContainerEl.appendChild(noResultsMessage);
      } else {
        res.results.forEach((movie) => {
          const imgPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://placehold.co/200x300?text=No+Movie+Poster";

          const movieUl = document.createElement("ul");
          movieUl.className =
            "flex flex-col items-center w-64 m-2 bg-slate-700 rounded-lg p-3";
          movieUl.innerHTML = `
            <li><img class="object-cover rounded-lg my-2" src="${imgPath}" alt="Image of ${
            movie.title
          }"></li>
            <li><strong>${movie.title}</strong></li>
            <li>${
              movie.release_date ? movie.release_date.slice(0, 4) : "N/A"
            }</li>
          `;
          searchResultsContainerEl.appendChild(movieUl);
        });
      }
    })
    .catch((err) => console.error(err));
});
