const print = console.log;
const express = require('express')
const router = new express.Router()

const Product = require('../models/product')

router.post('/',async (req,res)=>{
      
   print(req.body)
    const product = new Product(req.body);
    try{
            await product.save();
          res.send("Saved succesfully") 
    } catch(e){
     res.send('failed to save')
    }
})

router.get('/', async (req,res)=>{
   
  try{
     const products = await Product.find({})
     res.render('products/index',{products})
  } catch(e){
  res.send(e);
  }
      
})

router.get('/item/:id', async (req,res)=>{
   
  try{
     const product = await Product.findOne({_id:req.params.id})
     console.log(product)
     if(!product)
     return res.send("id not found")
     res.render('products/show',{product})
  } catch(e){
  res.send(e);
  }
})
module.exports = router