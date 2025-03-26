const { data } = require("./src/config");
const express = require("express");
const path = require("path");
const routes = require("./src/routers");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.listen(data.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${data.PORT}`);
});
