const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//const Product = require('../models/product')

// const userSchema = new mongoose.Schema({
//     name: {
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//     }
// })

// const User = mongoose.model('User',userSchema)

// const me = new  Product({
//     name:"redmi note 9 pro",
//     category:"electronics",
//     specifications:{
//         color:"black",
//         x:"z"
//     },
//     price:"10010"	  
// })

// me.save(
    
// ).then((err)=>{
//     console.log(err);
// })