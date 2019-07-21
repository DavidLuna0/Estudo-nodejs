module.exports.home = function(application, req, res) {
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'Senha nao deve ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render("index", {validacao: erros});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);

    UsuarioDAO.autenticar(dadosForm, req, res);
}