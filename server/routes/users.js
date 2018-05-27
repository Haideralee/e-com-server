var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('./../models/user.model');

//TODO create auth middleware for checking authorizations.

/* SAVE User */
router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({message: 'something went wrong.'});
        }
        //TODO: exclude, ignore password.
        //generate token for next 10 hours.
        var tempUser = Object.assign({}, user._doc);
        tempUser.token = jwt.sign({_id: user._id }, 'ld_test', { expiresIn: "10h" });
        res.json(tempUser);
    });
});

/* LOGIN User */
router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return next(err);

        if(user){
            //TODO: exclude, ignore password.
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) res.send(400);
                else if(isMatch){
                    var tempUser = Object.assign({}, user._doc);
                    tempUser.token = jwt.sign({_id: user._id }, 'ld_test', { expiresIn: "10h" });
                    res.json(tempUser);
                }
                else res.status(403).send({message: 'The email or password ou have enter is incorrect.'})
            });
        }
        else {
            res.send(404)
        }
    });
});

/* guest User */
router.get('/guest', function(req, res, next) {
    var token = jwt.sign({_id: "guest_user"}, 'ld_test');
    res.json(token);
});

module.exports = router;