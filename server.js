const { env } = require("./src/config");
const express = require("express");
const path = require("path");
const routes = require("./src/routers");
const app = express();
const errorHandler = require("./src/middleware/errorHandler.js");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.use('api', routes);

app.use(errorHandler);
app.listen(env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${env.PORT}`);
});