const productService = require('../services/productService.js');

// Lista todos os produtos
const listProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Obtém um produto específico pelo ID
const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Cria um novo produto
const createProduct = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productService.createProduct(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

// Atualiza um produto pelo ID
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;
        const updatedProduct = await productService.updateProduct(productId, updatedData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Deleta um produto pelo ID
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        await productService.deleteProduct(productId);
        res.status(204).send(); // No Content
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};