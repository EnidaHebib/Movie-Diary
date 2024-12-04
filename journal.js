document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");

  // Sample movie data (could also fetch from an API)

  // Load notes from localStorage
  const loadNotes = () => {
    return JSON.parse(localStorage.getItem("movieNotes")) || {};
  };

  // Save notes to localStorage
  const saveNotes = (notes) => {
    localStorage.setItem("movieNotes", JSON.stringify(notes));
  };

  // Render a single movie card
  const renderMovie = (movie, notes) => {
    const movieDiv = document.createElement("div");
    movieDiv.className = "bg-gray-800 p-4 rounded shadow text-gray-200";

    movieDiv.innerHTML = `
        <img src="${movie.poster}" alt="${
      movie.title
    }" class="w-full h-80 object-cover rounded mb-3" />
        <h2 class="text-lg font-semibold mb-2">${movie.title}</h2>
        <p class="text-sm text-gray-400 mb-3">${movie.description}</p>
        <textarea
          class="w-full border border-gray-600 rounded p-2 mb-3 bg-gray-700 text-gray-200 placeholder-gray-500"
          placeholder="Add personal notes here..."
        >${notes[movie.id] || ""}</textarea>
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
      const movieId = saveButton.dataset.id;
      const updatedNotes = loadNotes();
      updatedNotes[movieId] = textarea.value;
      saveNotes(updatedNotes);
      alert("Note saved!");
    });

    favoritesContainer.appendChild(movieDiv);
  };

  // Load all movies
  const loadMovies = () => {
    const notes = loadNotes();
    movies.forEach((movie) => renderMovie(movie, notes));
  };

  loadMovies();
});
