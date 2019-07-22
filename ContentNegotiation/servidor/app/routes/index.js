module.exports = function(application){
	application.get('/', function(req, res){
		res.render('caf')
		/* res.format({
			html: () => {
				res.send("Bem vindo ao app NODEJS")
			},
			json: () => {
				var retorno = {
					body: 'Bem vindo ao app NODEJS'
				}
				res.json(retorno);
			}
		});
		res.send('Bem vindo a sua app NodeJS!'); */
	});

	application.post('/', function(req, res){
		var dados = req.body;
		res.send(dados);
	});
}