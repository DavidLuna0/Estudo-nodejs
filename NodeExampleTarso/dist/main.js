"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fatorial_1 = require("./fatorial");
console.log('n-fatorial');
const argv = require('yargs').demandOption('num').argv;
const num = argv.num;
//Atraves do objeto process é criado uma ponte entre o script executando e a maquina onde está executado
console.log(`O fatorial de ${num} é igual a ${fatorial_1.fatorial(num)}`);
console.log(module.paths);
