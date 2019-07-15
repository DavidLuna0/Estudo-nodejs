module.exports = function(application) {
    application.get('/formulario_inclusao_noticia', function(req, res) {
        res.render("admin/form_add_noticia")
    });

    application.post('/noticias/salvar', function(req, res) {
        const noticias = req.body;

        const connection = application.config.dbconnection();
        const noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticias, function(error, result){
            res.redirect("/noticias");
        })
    });
};