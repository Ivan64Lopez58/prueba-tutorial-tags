const swaggerJsdoc = require("swagger-jsdoc");  // solo una vez

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tutorial Tags API",
            version: "1.0.0",
            description: "API para gestión de tutoriales y etiquetas",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;