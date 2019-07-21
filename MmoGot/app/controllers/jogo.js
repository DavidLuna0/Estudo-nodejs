module.exports.jogo = function(application, req, res) {
    if(req.session.autorizado) {
        res.render("jogo");
    } else {
        res.send('Usuario não está autenticado');
    }
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function(err) {
        res.render("index", {validacao: {}})
    })
}