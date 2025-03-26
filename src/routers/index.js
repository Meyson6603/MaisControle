const express = require("express");
const router = express.Router();
const transactionRoutes = require("./transactionRoutes.js");
const userRoutes = require("./userRoutes.js");
const authenticationRoutes = require("./authenticationRoutes.js");;

// router.use("/transactions", transactionRoutes);
router.use('/users', userRoutes);
router.use('/auth', authenticationRoutes);

module.exports = router;
