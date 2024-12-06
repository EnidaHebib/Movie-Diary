document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");

  // Load favorite movies from localStorage
  const loadFavorites = () => {
    return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  };

  // Save updated favorite movies to localStorage
  const saveFavorites = (movies) => {
    localStorage.setItem("favoriteMovies", JSON.stringify(movies));
  };

  // Render a single movie card
  const renderMovie = (movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "bg-gray-800 p-4 rounded shadow text-gray-200";

    movieDiv.innerHTML = `
        <img
          src="${movie.Poster}"
          alt="${movie.Title}"
          class="w-full h-80 object-cover rounded mb-3"
        />
        <h2 class="text-lg font-semibold mb-2">${movie.Title}</h2>
        <p class="text-sm text-gray-400 mb-3">${movie.Overview}</p>
        <textarea
          class="w-full border border-gray-600 rounded p-2 mb-3 bg-gray-700 text-gray-200 placeholder-gray-500"
          placeholder="Add personal notes here..."
        >${movie.notes || ""}</textarea>
        <button
          class="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400"
          data-id="${movie.id}"
        >
          Save Note
        </button>
      `;

    // Add event listener to save button
    const saveButton = movieDiv.querySelector("button");
    saveButton.addEventListener("click", () => {
      const textarea = movieDiv.querySelector("textarea");

      const movieId = Number(saveButton.dataset.id);

      // Update the favoriteMovies array in localStorage
      const favoriteMovies = loadFavorites();

      const movieToUpdate = favoriteMovies.find(
        (movie) => Number(movie.id) === Number(movieId)
      );

      if (movieToUpdate) {
        movieToUpdate.notes = textarea.value; // Update the notes
        saveFavorites(favoriteMovies); // Save updated array to localStorage
        alert("Note saved!");
      }
    });

    favoritesContainer.appendChild(movieDiv);
  };

  // Render all favorite movies
  const renderFavorites = () => {
    const favoriteMovies = loadFavorites(); // Fetch favorite movies from localStorage
    favoriteMovies.forEach((movie) => {
      renderMovie(movie);
    });
  };

  renderFavorites();
});
