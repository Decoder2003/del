const express = require("express");
const app = express();

// middleware
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("Hey! there.");
})

app.get("/posts", async (req, res) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    res.send(data);
})

// Start server
app.listen(8000, () => { console.log("Server running at PORT:8000") });