require('./config/config')
const usuario = require('./routes/usuario')
const express = require('express');
var app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser')

app = usuario.app;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




//mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("CONECTADO A LA BASE DE DATOS");
    }
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto 3000");
})