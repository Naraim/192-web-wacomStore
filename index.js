var exphbs = require('express-handlebars');
const express = require("express");
var bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const createRoutes = require('./routes.js');

// importar file system
var fs = require('fs');
const app = express();

const port = 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const url = 'mongodb://localhost:27017';
const dbName = 'Store';
// const client = new MongoClient(url);

// conectar el cliente de mongo
MongoClient.connect(`mongodb+srv://@cluster0-myyhx.mongodb.net/store`,
    {
        auth:{
            user: 'Naraim',
            password: 'NaraimCK123'
        }
    },
    
    
    
    function(err, client) {
    // asegurarnos de que no existe un error
    assert.equal(null, err);

    console.log('connected');

    // conectamos el cliente a la base de datos que necesitamos
    const db = client.db('store');

  
    createRoutes(app, db);

    app.listen( process.env.PORT || 5000);

});



