const express = require("express");

const router = express.Router();

async function searchiTunes(query, media) {
    const url = `https://itunes.apple.com/search?term=${query}&media=${media}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}

router.get("/", async (req, res, next) => {
    try {
        
        const {term,media} = req.query;
        console.log(req.query)
        const results = await searchiTunes(term, media);

        return res.status(200).json(results);
    } catch (err) {
        res.status(err.statusCode ?? 400).json([]);
    }
});

module.exports = router;