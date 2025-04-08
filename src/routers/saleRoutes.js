const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");

router.post("/", saleController.createSale);
router.get("/", saleController.listSales);
router.get("/current-month", saleController.getInvoicesForCurrentMonth);
router.get("/:id", saleController.getSaleById);
router.put("/:id", saleController.updateSale);
router.delete("/:id", saleController.deleteSale);

module.exports = router;
