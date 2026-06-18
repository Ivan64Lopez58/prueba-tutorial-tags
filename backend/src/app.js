const express = require("express");
const cors = require("cors");

const app = express();

const tagRoutes = require("./routes/tag.routes");


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "API running"
    });
});

app.use("/api/tags", tagRoutes);


const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;
