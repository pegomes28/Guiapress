const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Articles");
const Category = require("./categories/Category");

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Middleware global para carregar categorias
app.use((req, res, next) => {
    Category.findAll()
        .then(categories => {
            res.locals.categories = categories;
            next();
        })
        .catch(err => {
            console.error("Erro ao carregar categorias no middleware:", err);
            res.locals.categories = [];
            next();
        });
});

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso');
    })
    .catch(error => {
        console.log(error);
    });

// Controllers
app.use("/", categoriesController);
app.use("/", articlesController);

// Rotas
app.get("/", (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']]
    }).then(articles => {
        res.render("index", { articles });
    });
});

app.get("/:slug", (req, res) => {
    const slug = req.params.slug;
    Article.findOne({
        where: { slug }
    }).then(article => {
        if (article) {
            res.render("article", { article });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    const slug = req.params.slug;
    Category.findOne({
        where: { slug },
        include: [{ model: Article }]
    }).then(category => {
        if (category) {
            res.render("index", { articles: category.articles });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

// Iniciar servidor
app.listen(5000, () => {
    console.log("O servidor está rodando na porta 4000");
});
