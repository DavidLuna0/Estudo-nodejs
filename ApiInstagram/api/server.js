const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('mongodb');
const objectId = require('mongodb').ObjectId;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 8081;
app.listen(port);

const db = new mongoDb.Db(
    'instagram',
    new mongoDb.Server('localhost', 27017, {}),
    {}
);

console.log("Servidor HTTP escutando na porta " + port);

app.get("/", (req, res) => {
    res.send({msg: 'Olá pessoal'})
})

app.post("/api", (req, res) => {
    var dados = req.body;
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.insert(dados, (err, records) => {
                if(err) {
                    res.json({'status': 'erro'});
                } else {
                    res.json({'status': 'inclusao realizada com sucesso'});
                }
                mongoclient.close();
            })
        })
    })
})

app.get("/api", (req, res) => {
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.find().toArray((err, result) => {
                if(err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
                mongoclient.close();
            });
        })
    })
});

app.get("/api/:id", (req, res) => {
    db.open((err, mongoclient) => {
        mongoclient.collection('postagens', (err, collection) => {
            collection.find(objectId(req.params.id)).toArray((err, result) => {
                if(err) {
                    res.json(err);
                } else {
                    res.json(result);
                }
                mongoclient.close();
            });
        })
    })
})
