const jwt = require('jsonwebtoken')


//esta funcion obtiene el token del header y lo  verifica
let verificaToken = (req, res, next) => {
    //obtnego el token
    let token = req.get('token');
    //  console.log(token);
    //verifico el token con la semilla que esta en 
    //variables de entorno  
    jwt.verify(token, process.env.SEMILLA, (err, decoded) => {
        if (err) {
            res.status(401).json({
                err
            })
        }
        //asigno el valor de usuario a req.usuario
        req.usuario = decoded.usuario;
        //es necesario usar next para que siga la funcion original de donde se llama
        next();
    })

}

let verificaAdminRol = (req, res, next) => {
    if (req.usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            message: 'No tiene permisos suficientes'
        })
    }
}


module.exports = {
    verificaToken,
    verificaAdminRol
}