const express = require("express");
const router = express.Router();

const transactionRoutes = require("./transactionRoutes.js");
const userRoutes = require("./userRoutes.js");
const authenticationRoutes = require("./authenticationRoutes.js");
const categoryRoutes = require("./categoryRoutes.js");
const productRoutes = require("./productRoutes.js");
const paymentRoutes = require("./paymentRoutes.js");
const recurrenceRoutes = require("./recurrenceRoutes.js");
const saleProductRoutes = require("./saleProductRoutes.js");
const saleRoutes = require("./saleRoutes");
const stockMovementRoutes = require("./stockMovementRoutes");

router.use("/users", userRoutes);
router.use("/auth", authenticationRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/payments", paymentRoutes);
router.use("/recurrences", recurrenceRoutes);
router.use("/transactions", transactionRoutes);
router.use("/sale-products", saleProductRoutes);
router.use("/sales", saleRoutes);
router.use("/stock-movements", stockMovementRoutes);

module.exports = router;
