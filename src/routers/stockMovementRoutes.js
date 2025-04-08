const express = require("express");
const router = express.Router();
const stockMovementController = require("../controllers/stockMovementController.js");

router.post("/", stockMovementController.createStockMovement);

module.exports = router;
