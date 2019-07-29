const fatorial = require('./fatorial')/* .fatorial */
console.log('n-fatorial');

/* console.log(`Executando o script a partir do diretorio ${process.cwd()}`)
process.on('exit', () => {
    console.log("Script esta prestes a terminar");
}) */


const num = parseInt(process.argv[2]);

//Atraves do objeto process é criado uma ponte entre o script executando e a maquina onde está executado

console.log(`O fatorial de ${num} é igual a ${fatorial(num)}`);