import { url } from "inspector";

// Puerto
process.env.PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
    // urlDB = 'mongodb://dierectazy:603571a.@ds151994.mlab.com:51994/cafe-udemy';

} else {
    //   urlDB = 'mongodb://dierectazy:603571a.@ds151994.mlab.com:51994/cafe-udemy';

    urlDB = process.env.MONGO_URI;

}


process.env.URLDB = urlDB;