const ProductRepository = require("../repositories/productRepository.js");
const AppError = require("../utils/AppError");

const createProduct = async (product) => {
  const { name, price, user_id } = product;

  if (!name || !price || !user_id) {
    throw new AppError("name, price e user_id são obrigatórios", 400);
  }

  return await ProductRepository.createProduct(product);
};

const listProducts = async () => {
  return await ProductRepository.listProducts();
};

const getProductById = async (id) => {
  if (!id) {
    throw new AppError("ID do produto é inválido", 400);
  }

  const product = await ProductRepository.getProductById(id);
  if (!product) {
    throw new AppError("Produto não encontrado", 404);
  }

  return product;
};

const updateProduct = async (id, product) => {
  if (!id) {
    throw new AppError("ID do produto é inválido", 400);
  }

  const { name, price, user_id } = product;
  if (!name || !price || !user_id) {
    throw new AppError("name, price e user_id são obrigatórios", 400);
  }

  return await ProductRepository.updateProduct(id, product);
};

const deleteProduct = async (id) => {
  if (!id) {
    throw new AppError("ID do produto é inválido", 400);
  }

  const product = await ProductRepository.getProductById(id);
  if (!product) {
    throw new AppError("Produto não encontrado", 404);
  }

  return await ProductRepository.deleteProduct(id);
};

const findByQuery = async (params, limit = 10, offset = 0) => {
  return await ProductRepository.findByQuery(params, limit, offset);
};

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findByQuery,
};
