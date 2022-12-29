const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

/* inserindo */
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res, status(500).send({ eror: error });
    }
    conn.query(
      "INSERT INTO produtos (nome, preco) VALUES (?,?)",
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error + " deu ruim " + mysql,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "produto inserido com sucesso",
          id_produto: resultado.insertId,
        });
      }
    );
  });
});

/* carregando  */
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res, status(500).send({ eror: error });
    }
    conn.query("select * from produtos", (error, resultado, fields) => {
      if (error) {
        return res, status(500).send({ eror: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

router.get("/:id_produto", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res, status(500).send({ eror: error });
    }
    conn.query(
      "select * from produtos where id_produto = ?",
      [req.params.id_produto],
      (error, resultado, fields) => {
        if (error) {
          return res, status(500).send({ eror: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

/* altera pode ser put */
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res, status(500).send({ eror: error });
    }
    conn.query(
      "UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?",
      [req.body.nome, req.body.preco, req.body.id_produto],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error + " deu ruim " + mysql,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "produto alterado com sucesso",
        });
      }
    );
  });
});

/* deletando -- delete né */
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res, status(500).send({ eror: error });
    }
    conn.query(
      "DELETE FROM produtos WHERE id_produto = ?",
      [req.body.id_produto],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error + " deu ruim " + mysql,
          });
        }
        res.status(201).send({
          mensagem: "produto removido com sucesso",
        });
      }
    );
});
});

module.exports = router;
