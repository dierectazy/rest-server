// Puerto
process.env.PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//vencimiento token
//entorno
process.env.CADUCIDAD = 60 * 60 * 24 * 30;

//semilla de autenticacion

process.env.SEMILLA = 'ECTAZY_HEROBO-SEED3';
let urlDB;

if (process.env.NODE_ENV === 'dev') {

    //urlDB = process.env.MONGO_URI;
    urlDB = 'mongodb://localhost:27017/cafe';
    // urlDB = 'mongodb://dierectazy:603571a.@ds151994.mlab.com:51994/cafe-udemy';

} else {
    //   urlDB = 'mongodb://dierectazy:603571a.@ds151994.mlab.com:51994/cafe-udemy';

    urlDB = process.env.MONGO_URI;

}


process.env.URLDB = urlDB;