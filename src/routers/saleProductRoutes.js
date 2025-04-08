const express = require("express");
const router = express.Router();
const {
  createSaleProduct,
  getProductsBySale,
  deleteSaleProduct,
} = require("../controllers/saleProductController");

// Criar um novo item de produto na venda
router.post("/", createSaleProduct);

// Listar produtos de uma venda
router.get("/:saleId", getProductsBySale);

// Deletar um produto da venda
router.delete("/:id", deleteSaleProduct);

module.exports = router;
