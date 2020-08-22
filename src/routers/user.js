const express = require('express')
const User = require('../models/user')

const passport = require('passport')
const print = console.log;
const router = new express.Router()



router.get('/signUp',async (req, res)=>{

    res.render('signUp');

})
router.post('/signUp',async (req, res)=>{

    // console.log(req.body)
    const user = new User(req.body);
    print(req.body.email, req.body.password)
  try {
         await user.save();
         res.status(200).send("data saved succussfully") 
  } catch(err){
         res.status(400).send("data error")
  }

})
router.get('/signin',(req, res)=>{

    res.render('signIn');

})
// router.post('/signin', async(req, res)=>{
//     try { 
//          print(req.body.email,req.body.password)
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         res.send({ user })
//     } catch (e) {
//         res.status(400).send("" + e)
//     }
// })
router.post('/signIn', passport.authenticate('local-login', {
    successRedirect: '/signUp',
    failureRedirect: '/signIn'
    }))

  router.get('/me',(req,res)=>{
      res.send(req.user)
  })  

module.exports = router;