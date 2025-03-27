const { db } = require('../config');

const CreateTrasition = async (transition) => {
    const { description, amount, id_user, price, date, type, category, observation } = transition;
    // console.log(name, email, password)
    const response = await db.query(
        'INSERT INTO trasition (description, amount, id_user, price, date, type, category, observation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, description, amount, id_user, price, date, type, category, observation',
        [description, amount, id_user, price, date, type, category, observation]
    );
    return response.rows[0];
}

const listTransactions = async () => {
    const response = await db.query('SELECT id, description, amount, id_user, price, date, type, category, observation FROM trasition');
    return response.rows;
}

const getTransaction = async (id) => {
    const response = await db.query('SELECT id, description, amount, id_user, price, date, type, category, observation FROM trasition WHERE id = $1', [id]);
    return response.rows[0];
}

const updateTransaction = async (id, transaction) => {
    const { description, amount, id_user, price, date, type, category, observation } = transaction;
    const response = await db.query(
        'UPDATE trasition SET description = $1, amount = $2, id_user = $3, price = $4, date = $5, type = $6, category = $7, observation = $8 WHERE id = $9 RETURNING id, description, amount, id_user, price, date, type, category, observation',
        [description, amount, id_user, price, date, type, category, observation, id]
    );
    return response.rows[0];
}

const deleteTransaction = async (id) => {
    const response = await db.query('DELETE FROM trasition WHERE id = $1 ', [id]);
    return response.rows[0];
}


module.exports = {
    CreateTrasition,
    listTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
}
