import {useEffect, useState} from"react";
import StartRatin from"./Start/StarRating";


const tempMovieData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
  ];
  
  const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];

  const avarage = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY = "f84fc31d";

  export default function  App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    return (
        <>
        <NavBar>
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
        </NavBar>
        </>
    )
  }


  function Loarder() {
    return (
        <p className="loader">Loading....</p>
    )
  }

  function ErrorMessage({ message }) {
    return(
        <p className="error">
            <span>⛔️</span>
        </p>
    )
  }

  function NavBar( {children} ) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
  }

  function Logo() {
    return(
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
  }

  function Search( {query, setQuery} ) {
    return (
        <input 
        className="search" type="text" placeholder="search movies ..."
         value={query} onChange={(e) => setQuery(e.target.value)} />
    )
  }

  function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <stron>{movies.length}</stron> results
        </p>
    )
  }

  function Main({ children }) {
    return <main className="main">{children}</main>
  }

  function Box( {children} )  {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button className="btn-toggle" onClick={() => setIsOpen((open) =>!open)}>
                {isOpen ? "-" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
  }

  function MovieList({ movies, onSelectMovie }) {
    return (
        <ul class  Name="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} /> 
            ))}
        </ul>
    )
  }

  function Movie( {movie, onSelectMovie} ) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
  }

  function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched })  {
    const [movie, setMovie] = useState({});
    const [isLoading, setLoading] = useState("");
    const [userRating, setUserRating] = useState("");

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;
    const {
        Title: title,
        Year: year,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

function handleAdd() {
    const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
     function callback(e) {
      if(e.code === "Escape") {
        onCloseMovie();
      }
     }

    document.addEventListener("keydown", callback);
    
    return function() {
      document.removeEventListener("keydown", callback);
    
  
  }
  }
    [onCloseMovie]
  )

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if(!title) return;
      document.title = `movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      }
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!isWatched ? (
              <>
              <StartRatin maxRating={110} 
              size={24} onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
              )}
              </>
            ) : (
              <p>
                You reated with movie {watchedUserRating} <span>⭐️</span>
              </p>
            )}
          </div>
          <p>
            <em>{plot}</em>
          </p>
          <p>Strring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        </>
      )
      }

    </div>

  );
}