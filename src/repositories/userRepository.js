const { db } = require('../config');

const createUser = async (user) => {
    const { name, email, password } = user;
    console.log(name, email, password)
    const response = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, password]
    );
    return response.rows[0];
}

const listUsers = async () => {
    const response = await db.query('SELECT id, name, email FROM users');
    return response.rows;
}

const getUser = async (id) => {
    const response = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return response.rows[0];
}

const updateUser = async (id, user) => {
    const { name, email, password } = user;
    const response = await db.query(
        'UPDATE users SET name = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, name, email',
        [name, email, password, id]
    );
    return response.rows[0];
}

const deleteUser = async (id) => {
    const response = await db.query('DELETE FROM users WHERE id = $1 ', [id]);
    return response.rows[0];
}

const findByQuery = async (params, limit = 10, offset = 0) => {
    const queryConditions = [];
    const queryValues = [];
    let queryString = 'SELECT id, name, email, password FROM users';

    Object.entries(params).forEach(([key, value], index) => {
        queryConditions.push(`${key} ILIKE $${index + 1}`); 
        queryValues.push(`%${value}%`);
    });

    if (queryConditions.length) {
        queryString += ` WHERE ${queryConditions.join(' AND ')}`;
    }

    queryString += ` LIMIT $${queryValues.length + 1} OFFSET $${queryValues.length + 2}`;
    console.log(queryString, queryValues);
    queryValues.push(limit, offset);

    const response = await db.query(queryString, queryValues);
    return response.rows;
};


module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
    findByQuery
};