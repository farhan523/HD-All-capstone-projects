import React from "react";
import "./AudioBookInfoComponent.css";

const AudioBookCard = ({ audiobook, addToFavoritesOrRemove,favorite,index }) => {
    return (
        <div className="audiobook-info">
            <img src={audiobook.artworkUrl100} alt="Audiobook Artwork" />
            <div className="audiobook-details">
                <h2>{audiobook.collectionName}</h2>
                <p>
                    <strong>Author:</strong> {audiobook.artistName}
                </p>
                <p>
                    <strong>Genre:</strong> {audiobook.primaryGenreName}
                </p>
                <p>
                    <strong>Release Date:</strong> {new Date(audiobook.releaseDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Price:</strong> {audiobook.collectionPrice} {audiobook.currency}
                </p>
                <p dangerouslySetInnerHTML={{ __html: audiobook.description }}></p>
                <a href={audiobook.collectionViewUrl} target="_blank" rel="noopener noreferrer">
                    View on iTunes
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(audiobook);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default AudioBookCard;
