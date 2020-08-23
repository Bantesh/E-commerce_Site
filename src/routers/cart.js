const Cart = require("../models/cart")
const express = require('express')
const router = new express.Router()
const print = console.log
router.post('/cart', async (req, res)=>{
     try{
            print(req.body)
            const cart = new Cart({userId:req.body.userId,
            products:{pid:req.body.pid}})
            await cart.save(); 
            res.send(cart)

     } catch(e){
        res.send("" + e)
     }
})
router.get('/cart', async (req, res)=>{
    try{
           print(req.body)
           const cart = await (await Cart.findOne({userId:req.body.userId}).populate("products.pid")).execPopulate()
           res.send(cart)

    } catch(e){
       res.send("" + e)
    }
})

// We can discuss this approach 

router.post('/cart/:id/:action', async (req, res)=>{
    try{
           
        const cart = await Cart.findById({_id:req.params.id});
          if(!cart)
            return res.send("id not found");   

          let action = parseInt(req.body.action);
          // decrease quantity -> 0
          // increase quantity -> 1
          // delete cart -> 2
          if(action === undefined)
          {  // just for testing
              return res.send("cart action not found")
          }
          if( action == 2){
              
            cart.products =  cart.products.filter(product => { 
            return product._id != req.body.id})
           
            }else{
               
                    cart.products.forEach(product => {
                    if(product._id == req.body.id){
                        if(action == 0){
                        product.qty = product.qty  - 1;
                        } else if(action ==1 ){
                            product.qty = product.qty + 1;
                        } 
                    }
                
            });
        }
        await cart.save();
        res.send(cart)
        print(cart)
    } catch(e){
       res.send("" + e)
    }
})

module.exports = router;