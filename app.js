const express = require('express');
const app = express();/* app instanciando express */
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routeProdutos =  require('./routes/produtos');
const routePedidos =  require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());// json de entrada no body

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Origin',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Origin-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});
  
app.use('/produtos', routeProdutos);
app.use('/pedidos', routePedidos);

/* quando não encontra a rota */
app.use((req, res, next ) => {
    const erro = new Error('Não encontrado');
    erro.status(404);
    next(erro);
})

app.use((error, req, res, next ) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            mensagem: error.message + " deu ruim"
        }
    })
})

module.exports = app;