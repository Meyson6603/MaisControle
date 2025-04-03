const { db } = require('../config');

// Cria um novo produto
const createProduct = async (product) => {
    const { name, price, description } = product;
    const response = await db.query(
        'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING id, name, price, description',
        [name, price, description]
    );
    return response.rows[0];
};

// Lista todos os produtos
const listProducts = async () => {
    const response = await db.query('SELECT id, name, price, description FROM products');
    return response.rows;
};

// Obtém um produto pelo ID
const getProduct = async (id) => {
    const response = await db.query('SELECT id, name, price, description FROM products WHERE id = $1', [id]);
    return response.rows[0];
};

// Atualiza um produto pelo ID
const updateProduct = async (id, product) => {
    const { name, price, description } = product;
    const response = await db.query(
        'UPDATE products SET name = $1, price = $2, description = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, name, price, description',
        [name, price, description, id]
    );
    return response.rows[0];
};

// Deleta um produto pelo ID
const deleteProduct = async (id) => {
    const response = await db.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    return response.rows[0];
};

// Busca produtos com base em parâmetros dinâmicos
const findByQuery = async (params, limit = 10, offset = 0) => {
    const queryConditions = [];
    const queryValues = [];
    let queryString = 'SELECT id, name, price, description FROM products';

    Object.entries(params).forEach(([key, value], index) => {
        queryConditions.push(`${key} ILIKE $${index + 1}`);
        queryValues.push(`%${value}%`);
    });

    if (queryConditions.length) {
        queryString += ` WHERE ${queryConditions.join(' AND ')}`;
    }

    queryString += ` LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}`;
    queryValues.push(limit, offset);

    const response = await db.query(queryString, queryValues);
    return response.rows;
};

module.exports = {
    createProduct,
    listProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    findByQuery,
};