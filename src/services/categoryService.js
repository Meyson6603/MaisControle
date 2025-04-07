const categoryRepository = require("../repositories/categoryRepository.js");

const createCategory = async (category) => {
  if (!category.name) {
    throw new Error("O nome da categoria é obrigatório.");
  }
  return await categoryRepository.createCategory(category);
};

const getCategoryById = async (id) => {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  return await categoryRepository.getCategoryById(id);
};

const listCategories = async () => {
  return await categoryRepository.listCategories();
};

const updateCategory = async (id, category) => {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  if (!category.name) {
    throw new Error("O nome da categoria é obrigatório.");
  }
  return await categoryRepository.updateCategory(id, category);
};

const deleteCategory = async (id) => {
  if (!id) {
    throw new Error("ID da categoria é obrigatório.");
  }
  return await categoryRepository.deleteCategory(id);
};

module.exports = {
  createCategory,
  getCategoryById,
  listCategories,
  updateCategory,
  deleteCategory,
};
