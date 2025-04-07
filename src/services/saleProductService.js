const saleProductRepository = require("../repositories/saleProductRepository.js");

const createSaleProduct = async (saleProductData) => {
  return await saleProductRepository.createSaleProduct(saleProductData);
};

const getProductsBySale = async (saleId) => {
  return await saleProductRepository.getProductsBySale(saleId);
};

const deleteSaleProduct = async (id) => {
  return await saleProductRepository.deleteSaleProduct(id);
};

module.exports = {
  createSaleProduct,
  getProductsBySale,
  deleteSaleProduct,
};
