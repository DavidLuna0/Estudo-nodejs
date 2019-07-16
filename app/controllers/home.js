module.exports.index = function(application, req, res) {
    const connection = application.config.dbconnection();
    const noticiasModel = new application.app.models.NoticiasDAO(connection);
    noticiasModel.getUltimasNoticias(function(error, result) {
        res.render("home/index", {noticias : result});
    });
    
}