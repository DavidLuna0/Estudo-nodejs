const http = require('http');

http.createServer(function(req, res) {
    res.end("<html><body> Portal de noticias </body></html>")
}).listen(3000);