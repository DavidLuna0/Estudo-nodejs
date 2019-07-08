const mysql = require('mysql');
module.exports = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'teste',
        password: 'BancoTeste12!@',
        database: 'portal_noticias'
    });
}