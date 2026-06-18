const express = require("express");
const cors = require("cors");
const app = express();
const tagRoutes = require("./routes/tag.routes");
const tutorialRoutes = require("./routes/tutorial.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");

app.use(cors());
app.use(express.json());

// check rápido de que la API está viva
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "API running"
    });
});

// rutas principales
app.use("/api/tags", tagRoutes);
app.use("/api/tutorials", tutorialRoutes);

// documentación Swagger, muy básica
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// manejo de errores global
const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;
