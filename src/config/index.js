const { db } = require('./db.js');
const data = require('./dotenv.js');

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida:', res.rows[0]);
    }
});


module.exports = {
    db,
    data
};