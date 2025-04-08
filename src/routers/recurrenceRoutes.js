const express = require("express");
const router = express.Router();
const {
  createRecurrence,
  getRecurrence,
  listRecurrences,
  updateRecurrence,
  deleteRecurrence,
  getPendingRecurringPayments,
  getTotalPendingRecurringPayments,
  getPendingRecurrences,
  getPendingRecurrencesByDate,
} = require("../controllers/recurrenceController");

router.post("/", createRecurrence);
router.get("/", listRecurrences);
router.get("/:id", getRecurrence);
router.put("/:id", updateRecurrence);
router.delete("/:id", deleteRecurrence);

// Extras
router.get("/status/pending", getPendingRecurringPayments);
router.get("/status/pending/total", getTotalPendingRecurringPayments);
router.get("/recurrences/pending", getPendingRecurrences);
router.get("/recurrences/pending/by-date", getPendingRecurrencesByDate);

module.exports = router;
