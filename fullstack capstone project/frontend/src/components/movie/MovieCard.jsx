import React from "react";
import "./movie.css"; // Import your CSS file

const MovieCard = ({ movie, addToFavoritesOrRemove, favorite, index }) => {
    return (
        <div key={Math.random()} className="movie-info">
            <img src={movie.artworkUrl100} alt="Movie Artwork" />
            <div className="movie-details">
                <h2>{movie.trackName}</h2>
                <p>
                    <strong>Director:</strong> {movie.artistName}
                </p>
                <p>
                    <strong>Collection:</strong> {movie.collectionName}
                </p>
                <p>
                    <strong>Genre:</strong> {movie.primaryGenreName}
                </p>
                <p>
                    <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Price:</strong> {movie.trackPrice} {movie.currency}
                </p>
                <p>
                    <strong>Rating:</strong> {movie.contentAdvisoryRating}
                </p>
                <p>{movie.shortDescription}</p>
                <a href={movie.trackViewUrl} target="_blank" rel="noopener noreferrer">
                    View on iTunes
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(movie);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
