const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPaymentById,
  listPayments,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
  getPendingPayments,
  getTotalPendingPayments,
} = require("../controllers/paymentController.js");

// CRUD
router.get("/", listPayments);
router.get("/:id", getPaymentById);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

// Extras
router.patch("/:id/status", updatePaymentStatus);
router.get("/status/pending", getPendingPayments);
router.get("/status/pending/total", getTotalPendingPayments);

module.exports = router;
