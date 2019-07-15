module.exports = function(app) {
    app.get('/noticia', function(req, res) {
        const connection = app.config.dbconnection();

        connection.query('select * from noticias where id_noticia = 2', function(error, result) {
            console.log(error);
            res.render("noticias/noticia", {noticia : result})
        });
    });
};