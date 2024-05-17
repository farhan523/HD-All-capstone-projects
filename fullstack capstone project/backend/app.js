const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const port = process.env.PORT || 5000;

const mediaRouter = require("./Routes/mediaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/media", mediaRouter);

// 404 error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: req.app.get("env") === "development" ? err : {}
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
