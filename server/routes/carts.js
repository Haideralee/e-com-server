var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cart = require('./../models/cart.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL Carts */
router.get('/', function(req, res, next) {
    Cart.find({}, function (err, carts) {
        if (err) return next(err);
        res.json(carts);
    });
});

/* GET SINGLE Cart BY ID */
router.get('/:key/:id', function(req, res, next) {
    if(!req.params.id || req.params.id == "undefined") return res.json([]);
    let key = req.params.key;
    Cart.find({[key]: req.params.id, status: 'Pending'}, function (err, cart) {
        if (err) return next(err);
        res.json(cart);
    });
});

/* SAVE Cart */
router.post('/', function(req, res, next) {
    Cart.create(req.body, function (err, cart) {
        if (err) return next(err);
        res.json(cart);
    })
});

/* DELETE Cart */
router.delete('/:id', function(req, res, next) {
    Cart.findByIdAndRemove(req.params.id, function (err, cart) {
        if (err) return next(err);
        res.json(cart);
    });
});

module.exports = router;