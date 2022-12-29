const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o get dentro da rota de pedidos'
    });
});

router.post('/', (req, res , next) => {
    const pedido = {
        id_pedido: req.body.id_pedido,
        quantidade: req.body.quantidade
    };

    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de pedidosss',
        pedidoCriado: pedido
    })
}) 

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_produto

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Você descobriu o id especial',
            id: id
        })
    }else {
        res.status(200).send({
            mensagem: 'você passou um ID' 
        });
    }
});


router.delete('/', (req, res , next) => { 
    res.status(201).send({
        mensagem: 'Usando o delete dentro da rota de produtos'
    })
}) 

module.exports = router;
