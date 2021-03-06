"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const server = restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
});
server.get('/home', (req, res, next) => {
    res.json({ message: 'hello' });
    return next();
});
server.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
