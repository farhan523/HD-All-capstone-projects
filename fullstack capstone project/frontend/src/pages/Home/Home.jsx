import React, { useState } from "react";
import baseUrl from "../../../baseUrl/baseUrl";
import "./Home.css";
import Song from "../../components/song/Song";
import PodcastCard from "../../components/poadcast/podcast";
import MovieCard from "../../components/movie/MovieCard";
import AudioBookCard from "../../components/audioBook/AudioBookCard";
import SoftwareInfoComponent from "../../components/software/SoftwareCard";
import EbookInfoComponent from "../../components/ebook/EbookCard";
import { Circles } from "react-loader-spinner";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [mediaType, setMediaType] = useState("movie");
    const [searchResults, setSearchResults] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/media?term=${searchTerm}&media=${mediaType}`);
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
        setLoading(false);
    };

    function addToFavorite(item) {
        item.mediaType = mediaType;
        setFavorite((prev) => {
            return [...prev, item];
        });
    }

    function removeFromFavorite(index) {
        let favoriteCopy = [...favorite];
        favoriteCopy.splice(index, 1);
        console.log(favoriteCopy);
        setFavorite(favoriteCopy);
    }

    return (
        <>
            <h1 className="header"> Search Anything from iTunes Store </h1>{" "}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="container">
                    <input type="text" placeholder="Enter search term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />{" "}
                    <select
                        value={mediaType}
                        onChange={(e) => {
                            setMediaType(e.target.value);
                            setSearchResults([]);
                        }}
                    >
                        <option value="movie"> Movie </option> <option value="podcast"> Podcast </option> <option value="music"> Music </option> <option value="audiobook"> Audio Book </option> <option value="software"> Software </option>{" "}
                        <option value="ebook"> E book </option>{" "}
                    </select>
                    <button onClick={handleSearch}> Search </button>{" "}
                    <div className="media">
                        {loading ? (
                            <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
                        ) : (
                            <>
                                {searchResults.map((result) => {
                                    if (mediaType === "music") return <Song addToFavoritesOrRemove={addToFavorite} song={result} />;
                                    if (mediaType === "podcast") return <PodcastCard addToFavoritesOrRemove={addToFavorite} podcast={result} />;
                                    if (mediaType === "movie") return <MovieCard addToFavoritesOrRemove={addToFavorite} movie={result} />;
                                    if (mediaType === "audiobook") return <AudioBookCard addToFavoritesOrRemove={addToFavorite} audiobook={result} />;
                                    if (mediaType === "software") return <SoftwareInfoComponent addToFavoritesOrRemove={addToFavorite} software={result} />;
                                    if (mediaType === "ebook") return <EbookInfoComponent addToFavoritesOrRemove={addToFavorite} ebook={result} />;
                                })}
                                {searchResults.length === 0 && <h1>No Data to Show</h1>}
                            </>
                        )}
                    </div>
                </div>
                <div className="container">
                    <h1 style={{ marginBottom: "2.5rem" }}>favorite items will shown here</h1>
                    {favorite.map((item, index) => {
                        if (item.mediaType == "music") return <Song favorite={true} addToFavoritesOrRemove={removeFromFavorite} song={item} index={index} />;
                        if (item.mediaType == "podcast") return <PodcastCard favorite={true} addToFavoritesOrRemove={removeFromFavorite} podcast={item} index={index} />;
                        if (item.mediaType == "movie") return <MovieCard favorite={true} addToFavoritesOrRemove={removeFromFavorite} movie={item} index={index} />;
                        if (item.mediaType == "audiobook") return <AudioBookCard favorite={true} addToFavoritesOrRemove={removeFromFavorite} audiobook={item} index={index} />;
                        if (item.mediaType == "software") return <SoftwareInfoComponent favorite={true} addToFavoritesOrRemove={removeFromFavorite} software={item} index={index} />;
                        if (item.mediaType == "ebook") return <EbookInfoComponent favorite={true} addToFavoritesOrRemove={removeFromFavorite} ebook={item} index={index} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
