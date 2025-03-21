require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static("./public"));
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
