const categoryRepository = require("../repositories/categoryRepository.js");

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await categoryRepository.createCategory(category);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Erro ao buscar categoria." });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await categoryRepository.listCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error listing categories:", error);
    res.status(500).json({ error: "Erro ao listar categorias." });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = req.body;
    const updated = await categoryRepository.updateCategory(id, category);
    if (!updated) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Erro ao atualizar categoria." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await categoryRepository.deleteCategory(id);
    if (!deleted) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.json({ message: "Categoria deletada com sucesso.", deleted });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  listCategories,
  updateCategory,
  deleteCategory,
};
