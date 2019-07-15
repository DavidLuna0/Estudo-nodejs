module.exports = function(app) {
    app.get('/noticias', function(req, res) {
        const connection = app.config.dbconnection();

        connection.query('select * from noticias', function(error, result) {
            console.log(error);
            res.render("noticias/noticias", {noticias : result})
        });
    });
};