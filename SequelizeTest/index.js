const express = require('express');
const { User } = require('./app/models');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Seja bem vindo a aplicação');
});

app.get('/users', async (req, res) => {
    await User.findAll().then(result => {
        res.status(200).send(result);
    });
});

app.post('/users', async (req, res) => {
    const {name, email, password} = req.body;
    await User.create({name, email, password}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    });

});

app.get('/users/:id',async (req, res) => {
    await User.findByPk(req.params.id).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    })
});

app.put('/users/:id',async (req, res) => {
    const {name, email, password} = req.body;
    const id = req.params.id;
    User.update({name, email, password}, {where: {id}}).then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.send(err);
    })
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(user => {
        user.destroy().then(result => {
            res.send(result);
        });
    }).catch(err => {
        res.send(err)
    })
});

app.listen(3000);