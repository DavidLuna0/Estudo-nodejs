const dbconn = require('../../config/dbconnection');

module.exports = function(app) {

    const connection = dbconn();

    app.get('/noticias', function(req, res) {

        connection.query('select * from noticias', function(error, result) {
            console.log(error);
            res.render("noticias/noticias", {noticias : result})
        });
    });
};