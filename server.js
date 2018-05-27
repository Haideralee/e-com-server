var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var seedData = require('./server/seed');

mongoose.connect('mongodb://localhost/ldTest')
    .then(function(){
        console.log('DB Connected...')
    })
    .catch(function(err){
        console.error(err)
    });

app.use(cors());

//serve static files.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//REST Api.
app.use('/api/users', require('./server/routes/users'));
app.use('/api/products', require('./server/routes/products'));
app.use('/api/carts', require('./server/routes/carts'));

var server  = app.listen(8080, function(){
    console.log("We have started our server on port 8080");
});
