var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.model');
var Product = require('./product.model');

// create a schema
var cartSchema = new Schema({
    status: {
        type: String,
        enum : ['Pending','Complete'],
        default: 'Pending'
    },
    browserId: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Cart = mongoose.model('Cart', cartSchema);

// make this available to Cart in our Node applications
module.exports = Cart;