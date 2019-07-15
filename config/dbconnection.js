const mysql = require('mysql');
const connMysql = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'teste',
        password: 'BancoTeste12!@',
        database: 'portal_noticias'
    });
}
module.exports = function() {
    return connMysql;
}