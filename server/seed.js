/**
 * Populate DB with sample data on server start
 */

'use strict';
var Product = require('./models/product.model');
var User = require('./models/user.model');
var Cart = require('./models/cart.model');
var dummyProducts = [];
for(var i = 1; i < 10; i++){
  dummyProducts.push({
    name: `Dummy Product ${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae nisi eu risus egestas facilisis et eget nibh.",
    price: Number(`${i}0`),
    quantity: Number(`${i}00`)
  })
}

User.find({}).remove()
    .then(() => {
      return User.create({
        role: 'user',
        name: 'Test',
        email: 'test@example.com',
        password: 'test'
      }, {
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
          .then((users) => {
            //console.log('finished populating users : ', users);
            Product.find({}).remove()
                .then(() => {
                  return Product.create(dummyProducts)
                      .then((products) => {
                        //console.log('finished populating products : ');
                        Cart.find({}).remove()
                            .then(() => {
                              //console.log('start cart populating : ', users , '-', products[0]);
                              return Cart.create({
                                borwserId: '',
                                user: users._id,
                                product: products[0]._id
                              }, {
                                borwserId: '',
                                user: users._id,
                                product: products[0]._id
                              })
                                  .then(() => console.log('seed data added.'))
                                  .catch(err => console.log('error populating users', err));
                            });
                      })
                      .catch(err => console.log('error populating products', err));
                });
          })
          .catch(err => console.log('error populating users', err));
    });