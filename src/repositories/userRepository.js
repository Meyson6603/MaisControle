const { db } = require('../config');

const createUser = async (user) => {
    const { name, email, password } = user;
    console.log(name, email, password)
    const response = await db.query(
        'INSERT INTO users (name, email, passwd) VALUES ($1, $2, $3) RETURNING id, name, email',
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
        'UPDATE users SET name = $1, email = $2, passwd = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, name, email',
        [name, email, password, id]
    );
    return response.rows[0];
}

const deleteUser = async (id) => {
    const response = await db.query('DELETE FROM users WHERE id = $1 ', [id]);
    return response.rows[0];
}


module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
};