var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 8081,
    path: '/',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}
var html = 'nome=josé'
var json = {
    nome: 'jose'
}
var stringJson = JSON.stringify(json);

var bufferResponse = [];

var req = http.request(opcoes, (res) => {
    res.on('data', (chunk) => {
        bufferResponse.push(chunk);
    })

    res.on('end', () => {
        var bodyRes = Buffer.concat(bufferResponse).toString();
        console.log(bodyRes);
    })

    res.on('error', () => {

    })
})

req.write(stringJson);
req.end();