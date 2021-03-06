module.exports.formulario_inclusao_noticia = function(application, req, res) {
    res.render("admin/form_add_noticia", {validacao: {}, noticia : {}})
};

module.exports.noticias_salvar = function(application, req, res) {
    const noticia = req.body;

        req.assert('titulo', 'Titulo é obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo é obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor', 'Autor é obrigatorio').notEmpty();
        req.assert('data_noticia', 'Data é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});
        req.assert('noticia', 'Noticia é obrigatorio').notEmpty();

        const erros = req.validationErrors();

        if(erros) {
            res.render("admin/form_add_noticia", {validacao : erros, noticia : noticia});
            return;
        }

        const connection = application.config.dbconnection();
        const noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function(error, result){
            res.redirect("/noticias");
        })
};