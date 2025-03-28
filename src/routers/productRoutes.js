const express = require('express');
const router = express.Router();

const {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController.js');

// Rota para listar todos os produtos
router.get('/', listProducts);

// Rota para obter um produto específico pelo ID
router.get('/:id', getProduct);

// Rota para criar um novo produto
router.post('/', createProduct);

// Rota para atualizar um produto pelo ID
router.put('/:id', updateProduct);

// Rota para deletar um produto pelo ID
router.delete('/:id', deleteProduct);

module.exports = router;