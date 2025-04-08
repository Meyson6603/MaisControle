const express = require("express");
const router = express.Router();

const {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");

// Rota para listar todas as categorias
router.get("/", listCategories);

// Rota para obter uma categoria específica pelo ID
router.get("/:id", getCategoryById);

// Rota para criar uma nova categoria
router.post("/", createCategory);

// Rota para atualizar uma categoria pelo ID
router.put("/:id", updateCategory);

// Rota para deletar uma categoria pelo ID
router.delete("/:id", deleteCategory);

module.exports = router;
