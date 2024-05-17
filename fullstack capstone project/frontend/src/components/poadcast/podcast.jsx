import React from "react";
import "./podcast.css";

const PodcastCard = ({ podcast, addToFavoritesOrRemove, favorite, index }) => {
    return (
        <div className="podcast-info">
            <img src={podcast.artworkUrl100} alt="Podcast Artwork" />
            <div className="podcast-details">
                <h2>{podcast.trackName}</h2>
                <p>
                    <strong>Artist:</strong> {podcast.artistName}
                </p>
                <p>
                    <strong>Collection:</strong> {podcast.collectionName}
                </p>
                <p>
                    <strong>Genre:</strong> {podcast.primaryGenreName}
                </p>
                <p>
                    <strong>Release Date:</strong> {new Date(podcast.releaseDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Track Count:</strong> {podcast.trackCount}
                </p>
                <p>
                    <strong>Price:</strong> {podcast.trackPrice} {podcast.currency}
                </p>
                <p>
                    <strong>Rating:</strong> {podcast.contentAdvisoryRating}
                </p>
                <a href={podcast.trackViewUrl} target="_blank" rel="noopener noreferrer">
                    View on iTunes
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(podcast);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default PodcastCard;
