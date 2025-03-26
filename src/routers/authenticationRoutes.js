const express = require("express");
const router = express.Router();

const {
    authenticaController,
} = require("../controllers/authController.js");

router.post("/login", authenticaController);

exports.default = router;