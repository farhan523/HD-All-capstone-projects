import React from "react";
import "./SoftwareInfoComponent.css";

const SoftwareInfoComponent = ({ software, addToFavoritesOrRemove, favorite, index }) => {
    return (
        <div className="software-info">
            <img src={software.artworkUrl100} alt="Software Artwork" />
            <div className="software-details">
                <h2>{software.trackName}</h2>
                <p>
                    <strong>Developer:</strong>{" "}
                    <a href={software.artistViewUrl} target="_blank" rel="noopener noreferrer">
                        {software.artistName}
                    </a>
                </p>
                <p>
                    <strong>Genre:</strong> {software.genres.join(", ")}
                </p>
                <p>
                    <strong>Price:</strong> {software.formattedPrice}
                </p>
                <p>
                    <strong>Rating:</strong> {software.averageUserRating} stars ({software.userRatingCount} ratings)
                </p>
                <p>
                    <strong>Release Date:</strong> {new Date(software.releaseDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Advisories:</strong> {software.advisories.join(", ")}
                </p>
                <p>
                    <strong>Description:</strong> {software.description}
                </p>
                <a href={software.trackViewUrl} target="_blank" rel="noopener noreferrer">
                    View on App Store
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(software);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default SoftwareInfoComponent;
