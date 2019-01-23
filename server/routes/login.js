const express = require('express');
const app = express();

const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'UsuariO password incorrectos'
                }
            })
        }

        //comparo el pass que viene de la peticion contra el de BD
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario passworD incorrectos'
                }
            })
        }

        let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEMILLA, {
                expiresIn: process.env.CADUCIDAD
            })
            //expira en 30 dias
        res.json({
            ok: true,
            token

        })

    });


});


module.exports = {
    app
}