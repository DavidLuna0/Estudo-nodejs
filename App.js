const app = require('./config/server')

const rotaNoticias = require('./app/routes/noticias')(app);

const rotaHome = require('./app/routes/home')(app);

const rotaFormulario = require('./app/routes/formularioInclusaoNoticia')(app);

app.listen(3000, function() {
    console.log("Server ON");
});

