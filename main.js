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

const queryMovieTitle = "back to the future"; // search bar value that user typed

fetch(
  `https://api.themoviedb.org/3/search/movie?query=${queryMovieTitle}&include_adult=false&language=en-US&page=1`,
  options
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));
