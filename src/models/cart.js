const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({

     userId:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
     },
     products:[{pid:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Product'
     },
    qty: {
        type: Number,
        default:1,
        validate(value) {
          if( value <= 0){
              throw new Error("Quantity must be greater zero")
          }
        }
    }},
    ]
  

}, {timestamp : true})
const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart