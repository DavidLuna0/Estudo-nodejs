var crypto = require('crypto');

function UsuarioDAO(connection) {
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection) {
            var senha = crypto.createHash("md5").update(usuario.senha).digest("hex");

            usuario.senha = senha;
            collection.insert(usuario);
            mongoclient.close();
        })
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection) {
            var senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senha;
            collection.find(usuario).toArray((err, result) => {
                if(result[0] != undefined ) {
                    req.session.autorizado = true;
                    
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autorizado) {
                    res.redirect("jogo");
                } else {
                    res.render("index", {validacao: {}})
                }
            });
            mongoclient.close();
        })
    });
}

module.exports = function() {
    return UsuarioDAO;
}