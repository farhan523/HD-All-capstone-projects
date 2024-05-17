import React from "react";
import "./song.css";

const Song = ({ song, addToFavoritesOrRemove, index, favorite }) => {
    return (
        <div key={Math.random()} className="song-info">
            <img src={song.artworkUrl100} alt="Album Artwork" />
            <div className="song-details">
                <h2>{song.trackName}</h2>
                <p>{song.artistName}</p>
                <p>{song.collectionName}</p>
                <p>{song.primaryGenreName}</p>
                <p>
                    Price: {song.trackPrice} {song.currency}
                </p>
                <p>Released: {new Date(song.releaseDate).toLocaleDateString()}</p>
                <a href={song.trackViewUrl} target="_blank" rel="noopener noreferrer">
                    View on iTunes
                </a>
                <button
                    onClick={() => {
                        favorite ? addToFavoritesOrRemove(index) : addToFavoritesOrRemove(song);
                    }}
                >
                    {favorite ? "Remove From Favorite" : "Add to Favorites"}{" "}
                </button>
            </div>
        </div>
    );
};

export default Song;
