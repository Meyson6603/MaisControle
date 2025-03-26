const { db } = require('.');

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'lavila',
    host: 'localhost',
    database: 'bancodados',
    password: 'leoleoleo123',
    port: 5432,
});


module.exports = {
    db: pool
}