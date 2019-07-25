const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('mongodb');
const multiparty = require('connect-multiparty');
const objectId = require('mongodb').ObjectId;
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());
app.use(function(req, res, next) {
    res.setHeader("Acces-Controle-Allow-Origin", "*");
    res.setHeader("Acces-Controle-Allow-Method", "GET, POST, PUT, DELETE");
    res.setHeader("Acces-Controle-Allow-Headers", "content-type");
    res.setHeader("Acces-Controle-Allow-Credentials", true);
    next();
})

const port = 8081;
app.listen(port);

const db = new mongoDb.Db(
    'instagram',
    new mongoDb.Server('localhost', 27017, {}),
    {}
);

console.log("Servidor HTTP escutando na porta " + port);

app.get("/", (req, res) => {
    res.send({ msg: 'Olá pessoal' })
});

app.post("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const date = new Date();
    const time_stamp = date.getTime();
    const urlImagem = time_stamp + ' ' + req.files.arquivo.originalFilename;

    const pathOrigem = req.files.arquivo.path;
    const pathDestino = "./uploads/" + urlImagem;


    fs.rename(pathOrigem, pathDestino, (err) => {
        if(err) {
            res.status(500).json({error : err});
            return;
        }

        var dados = {
            url_imagem: urlImagem,
            titulo: req.body.titulo
        }
        db.open((err, mongoclient) => {
            mongoclient.collection('postagens', (err, collection) => {
                collection.insert(dados, (err, records) => {
                    if (err) {
                        res.json({ 'status': 'erro' });
                    } else {
                        res.json({ 'status': 'inclusao realizada com sucesso' });
                    }
                    mongoclient.close();
                });
            });
        });
    })
});

app.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.find().toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
                mongoclient.close();
            });
        });
    });
});

app.get('/uploads/:imagem', (req, res) => {
    const img = req.params.imagem;
    fs.readFile('./uploads/' + img, (err, content) => {
        if(err) {
            res.status(400).json(err);
            return;
        }
        res.writeHead(200, {
            'content-type' : 'image/jpg'
        })
        res.end(content);
    })
})

app.get("/api/:id", (req, res) => {
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.find(objectId(req.params.id)).toArray((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
                mongoclient.close();
            });
        });
    });
});

app.put("/api/:id", (req, res) => {
    res.send("ROta para atualização")
    /* db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.update(
                { _id: objectId(req.params.id) },
                { $set: { titulo: req.body.titulo } },
                {},
                (err, records) => {
                    if (err) {
                        res.json(err)
                    } else {
                        res.status(200).json(records);
                    }
                    mongoclient.close();
                }
            )
        });
    }); */
});

app.put("/api/:id", (req, res) => {
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.update(
                { _id: objectId(req.params.id) },
                { $set: { titulo: req.body.titulo } },
                {},
                (err, records) => {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json(records);
                    }
                    mongoclient.close();
                });
        });
    });
});

app.delete("/api/:id", (req, res) => {
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.remove({ _id : objectId(req.params.id)}, (err, records) => {
                if (err) {
                    res.status.json(err)
                } else {
                    res.json(records);
                }
                mongoclient.close();
            })
        });
    });
});


