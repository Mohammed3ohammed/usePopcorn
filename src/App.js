import {useEffect, useState } from "react";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f84fc31d";
// http://www.omdbapi.com/?apikey=${KEY}&s=interstellar

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = "interstellar";

    useEffect(() => {
      // Define an async function to fetch movies from the OMDB API
        async function fetchMovies() {
          // Set loading state to true before starting the fetch
          setIsLoading(true);
           // Send a request to the OMDB API with the given API key and search query
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
          // Parse the response as JSON
          const data = await res.json()
          // Update the movies state with the search results from the API
          setMovies(data.Search);
          // Set loading state to false after data is fetched
          setIsLoading(false);
        }

        fetchMovies()

    }, [])  // Empty dependency array means this useEffect runs only once when the component mounts

  return (
    <>
      <NavBar>
        <Search  />
        <NumResults movies={movies} />
      </NavBar>
      
    <Main>
        <Box>
             {isLoading ? <Loader /> : <MovieList movies={movies} />}
        </Box>
        <Box>
        </Box>
      </Main>
      
    </>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {



  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}



function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}