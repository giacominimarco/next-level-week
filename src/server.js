const express = require("express")
const server = express()

// pegar o bd
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//comfigurar caminhos da aplicação
//primeira pagina
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Seu marketplace de coleta de residos"
    })
})

server.get("/create-point", (req, res) => {
    // req.query: query strigs das urls
    
    console.log(req.query)


    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    // pegar os dados do bd
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão os seus registros: ")
        console.log(rows)

        // exibir os dados em tela
        res.render("search-results.html", { places: rows, total })
    })

})

//ligar o servidor
server.listen(3000)

