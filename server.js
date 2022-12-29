/* main file */
const http = require('http'); // cria serviço htpp
const app = require('./app') // pega o arquivo app
const port = process.env.PORT || 3000; // define porta padrao
const server = http.createServer(app); //criado o servidor,passando o app para o server e escutando na porta 3000
server.listen(port);
