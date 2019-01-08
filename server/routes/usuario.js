const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const underscore = require('underscore')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {

    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 5);


    //Usuario.find({google:true}).limit(limite).skip(desde)
    Usuario.find({ estado: true }, 'email nombre google')
        .limit(limite)
        .skip(desde)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                })
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                })
            })


        });
});


app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //una forma
        //usuarioDB.password = null;


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //  let body = req.body;
    //con pick de underscore lo que hago es indicar que campos quiero 
    //filtrar del body de la peticion
    let body = underscore.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])



    //new me devuelve el campo actualizado
    //runvalidators me corre las validadciones de campos
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {


        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({

                ok: true,
                usuario: usuarioDB
            });
        }

    });


});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //elimino logicamente
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioEliminado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            if (usuarioEliminado) {
                res.json({
                    ok: true,
                    id
                })
            }

        }

    })

    //elimino fisicamente
    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             })
         }

         if (usuarioBorrado) {
             res.json({
                 ok: true,
                 usuarioBorrado
             })

         } else {
             return res.status(400).json({
                 ok: false,
                 err: {
                     message: 'usuario no encontrado'
                 }
             })
         }

     })*/
});


module.exports = {
    app
}