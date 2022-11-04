const express = require('express')
const app = express()
let port = process.env.port || 3000

let animales = require("./animales")

app.use(express.static("public"))

app.get("/", (req, res)=>{
    let html = "<table><tr><th>Nombre</th><th>Edad</th><th>Tipo</th></tr>"
    animales.forEach((animal, i) => {
        html += `<tr><td>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td>`
        html += `<td><form method='get' action='/adoptar'><input hidden name='nombre' value='${animal.nombre}' /><button>Adoptar</button></form></td></tr>`
    })
    html += "</table>"

    res.send(html)
})

app.get("/sumar-animal", (req, res)=>{
    let animal = {
        nombre: req.query.nombre,
        edad: parseInt(req.query.edad),
        tipo: req.query.tipo
    }

    animales.push(animal)
    res.send(`Animal (${req.query.nombre}) añadido!`)
})

app.get("/adoptar", (req, res)=>{
    let animalIndex = animales.findIndex((animal) => animal.nombre === req.query.nombre)

    if (animalIndex < 0) {
        res.send(`No hay ningún animal llamado ${req.query.nombre} en adopción`)
    } else {
        animales.splice(animalIndex, 1)
        res.send(`${req.query.nombre} ha sido adoptado!!`)
    }
})


app.listen(port, err =>
    err 
    ? console.error("No se ha podido conectar")
    : console.log("Escuchando en puerto " + port)
)