import React from "react";
import "./EbookInfoComponent.css";

const EbookInfoComponent = ({ ebook, addToFavoritesOrRemove, index, favorite }) => {
    return (
        <div key={Math.random()} className="ebook-info">
            <img src={ebook.artworkUrl100} alt="Ebook Artwork" />
            <div className="ebook-details">
                <h2>{ebook.trackName}</h2>
                <p>
                    <strong>Author:</strong>
                    <a href={ebook.artistViewUrl} target="_blank" rel="noopener noreferrer">
                        {ebook.artistName}
                    </a>
                </p>
                <p>
                    <strong>Genre:</strong> {ebook.genres.join(", ")}
                </p>
                <p>
                    <strong>Price:</strong> {ebook.formattedPrice}
                </p>
                <p>
                    <strong>Release Date:</strong> {new Date(ebook.releaseDate).toLocaleDateString()}
                </p>
                <p>
                    <strong>Description:</strong> {ebook.description}
                </p>
                <a href={ebook.trackViewUrl} target="_blank" rel="noopener noreferrer">
                    View on Apple Books
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(ebook);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default EbookInfoComponent;
