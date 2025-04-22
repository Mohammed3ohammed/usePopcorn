import {useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Navbar/Search";
import NumResults from "./components/Navbar/NumResults";
import Loader from "./components/Main/Loader";
import ErrorMessage from "./components/Main/ErrorMessage";
import Main from "./components/Main/Main";
import Box from "./components/Main/Box";
import MovieList from "./components/Movie/MovieList";
import MovieDetails from "./components/Movie/MovieDetails";
import WatchedSummary from "./components/Watched/WatchedSummary";
import WatchedMoviesList from "./components/Watched/WatchedMoviesList";
import useLocalStorageState from "./components/Watched/useLocalStorageState";



const KEY = "f84fc31d";

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie () {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }


    useEffect(() => {
      const controller = new AbortController()
      // Define an async function to fetch movies from the OMDB API
        async function fetchMovies() {
          try {
          // Set loading state to true before starting the fetch
          setIsLoading(true);
           // Send a request to the OMDB API with the given API key and search query
            setError("");

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {signal: controller.signal}
          );

          if(!res.ok) throw new Error("Something went wrong with fetching movies")
          

          // Parse the response as JSON
          const data = await res.json()
          if(data.Response === "False") throw new Error ('Movie not found') 

          // Update the movies state with the search results from the API
          setMovies(data.Search);

        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message)
          }
          
        } finally {
                    // Set loading state to false after data is fetched
                    setIsLoading(false);
        }
        }

        if (query.length < 3) {
          setMovies([])
          setError("")
          return;
        }


        handleCloseMovie();
        fetchMovies();

        return function () {
          controller.abort();
        }

    }, [query])  // Empty dependency array means this useEffect runs only once when the component mounts

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      
    <Main>
        <Box>
             {isLoading && <Loader />}
             {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
             {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? ( 
          <MovieDetails selectedId={selectedId}
           onCloseMovie={handleCloseMovie}
           onAddWatched={handleAddWatched}
           watched={watched} />
           ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
              watched={watched} 
              onDeleteWatched={handleDeleteWatched}/>
            </>
            )}
        </Box>
      </Main>
    </>
  );
}