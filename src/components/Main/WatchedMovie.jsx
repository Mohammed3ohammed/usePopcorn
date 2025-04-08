import React from "react";

export default function WatchedMovie( {movie, onDeleteWatched } ) {
    return (
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p><span>⭐️</span> <span>{movie.userRating}</span></p>
          <p><span>⏳</span> <span>{movie.runtime}</span></p>
          <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
        </div>
      </li>
    )
 }