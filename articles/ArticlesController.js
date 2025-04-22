// Arquivos que fazem conexão com o banco de dados
const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("ROTA DE artigos")
});

router.get("/admin/articles/new", (req ,res) => {
    res.send("ROTA PARA CRIAR UMA NOVO ARTIGO")
})

module.exports = router;