const saleProductService = require("../services/saleProductService.js");

const createSaleProduct = async (req, res, next) => {
  try {
    const newSaleProduct = await saleProductService.createSaleProduct(req.body);
    res.status(201).json(newSaleProduct);
  } catch (err) {
    next(err);
  }
};

const getProductsBySale = async (req, res, next) => {
  try {
    const saleId = req.params.saleId;
    const products = await saleProductService.getProductsBySale(saleId);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const deleteSaleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await saleProductService.deleteSaleProduct(id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSaleProduct,
  getProductsBySale,
  deleteSaleProduct,
};
