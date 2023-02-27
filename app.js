const express = require("express");
const coursesRouter = require("./controllers/courses");
const app = express();
app.use(express.json());

app.get("/", (request, response) => response.send("Hello World"));
app.use("/api/courses", coursesRouter);

module.exports = app;
