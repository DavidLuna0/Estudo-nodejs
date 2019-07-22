var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 8081,
    path: '/',
    headers: {
        'Accept': 'application/json'
    }
}
var bufferResponse = [];

http.get(opcoes, (res) => {
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