// Authorization Token
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDA5NmM3NzM1M2I5OTFlNzlhZWZhMzJkMzc1NDc2NCIsIm5iZiI6MTczMzIxNDU4MC4xNCwic3ViIjoiNjc0ZWMxNzQ3OTliYzA0NzJkZWVhNjgwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KJIvTK6gNCgpJNKw2i3ecXIT5SczGO-InrhIvZNrmEg",
  },
};
// Selectors
const movieContainer = document.querySelector("section.container.mx-auto.grid");

/// Function to fetch popular movies
const fetchMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    return data.results; // Returns the list of popular movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

/// Function to generate movie card HTML
const createMovieCard = (movie) => {
  const { title, overview, poster_path } = movie;
  const imagePath = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/150x225";

  return `
    <div class="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
      <img
        src="${imagePath}"
        alt="${title}"
        class="w-40 h-60 object-cover rounded-md mb-3"
      />
      <h2 class="text-lg color text-white font-bold mb-2 text-center">${title}</h2>
      <p class="text-sm text-gray-400 mb-3 text-center">${
        overview || "No description available."
      }</p>
      <button
        class="bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-500 add-to-favorite"
        data-title="${title}"
      >
        Add to Favorite
      </button>
    </div>
  `;
};

// Function to populate movies into the DOM
const populateMovies = async () => {
  const movies = await fetchMovies();
  if (movies.length === 0) {
    movieContainer.innerHTML = `<p class="text-white text-center col-span-full">No movies available.</p>`;
    return;
  }

  movieContainer.innerHTML = movies
    .slice(0, 6) // Display only the first 6 movies for now
    .map(createMovieCard)
    .join("");

  attachFavoriteButtons();
};

// Function to handle "Add to Favorite" button clicks
const attachFavoriteButtons = () => {
  const favoriteButtons = document.querySelectorAll(".add-to-favorite");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieTitle = button.dataset.title;
      alert(`${movieTitle} added to favorites!`);
    });
  });
};

// Initialize the app
populateMovies();
