var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('./../models/product.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL Products */
router.get('/', function(req, res, next) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

module.exports = router;