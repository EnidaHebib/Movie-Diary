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
          src="${movie.poster}"
          alt="${movie.title}"
          class="w-full h-80 object-cover rounded mb-3"
        />
        <h2 class="text-lg font-semibold mb-2">${movie.title}</h2>
        <p class="text-sm text-gray-400 mb-3">${movie.description}</p>
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
        (movie) => movie.id === movieId
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
const favoriteMovies = [
  {
    id: 1,
    title: "Moana 2",
    description:
      "Moana 2 is an animated musical adventure film produced by Walt Disney.",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    notes: "", // This will store the user's personal notes
  },
  {
    id: 2,
    title: "Frozen 3",
    description:
      "Frozen 3 continues the epic story of Elsa and Anna in the kingdom of Arendelle.",
    poster:
      "https://media.themoviedb.org/t/p/w440_and_h660_face/mbPrrbt8bSLcHSBCHnRclPlMZPl.jpg",
    notes: "", // This will store the user's personal notes
  },
];

// Save favorite movies to localStorage
localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
