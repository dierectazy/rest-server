const express = require('express');
const app = express();


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./usuario').app);
app.use(require('./login').app);



module.exports = {
    app
}