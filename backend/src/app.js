const express = require("express");
const cors = require("cors");

const app = express();

const tagRoutes = require("./routes/tag.routes");
const tutorialRoutes = require("./routes/tutorial.routes");


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "API running"
    });
});

app.use("/api/tags", tagRoutes);
app.use("/api/tutorials", tutorialRoutes);


const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;
