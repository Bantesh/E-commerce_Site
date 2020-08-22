const print = console.log;
const express = require('express')
const router = new express.Router()

const Product = require('../models/product')

router.get('/',async (req,res)=>{
      
   print(req.body)
    const product = new Product(req.body);
    try{
            await product.save();
          res.send("Saved succesfully") 
    } catch(e){
     res.send('failed to save')
    }
})

module.exports = router