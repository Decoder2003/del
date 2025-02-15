const express = require("express");
const app = express();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// middleware
app.use(express.json());
// Serve static files
app.use(express.static("public"));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: "A simple API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Local server",
            },
            { url: "https://del-nu.vercel.app" }
        ],
    },
    apis: ["./index.js"], // Points to this file for Swagger annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css", customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.js",
    ],
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome route
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
app.get("/", (req, res) => {
    res.send("Hey! there.");
})

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Fetches sample posts
 *     responses:
 *       200:
 *         description: Returns an array of posts
 */
app.get("/posts", async (req, res) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    res.send(data);
})

// Start server
app.listen(8000, () => { console.log("Server running at PORT:8000") });