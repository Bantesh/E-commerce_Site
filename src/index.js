const print = console.log;
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express();

require('./db/mongoose')
const layout = require('express-ejs-layouts')
const userRouter = require('./routers/user');
const productRouter = require('./routers/products');
const cartRouter = require('./routers/cart');
const passport = require('passport');
require('./middleware/passport')

const port = process.env.PORT || 3005
const staticDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'/views')

print(viewsPath)

app.set('view engine','ejs')
app.set('views',viewsPath)
app.use(express.static(staticDirPath));
app.use(layout)

app.use(session({
    secret: "baba",
    saveUninitialized: false,
    resave: false
    }))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)
app.listen(port,()=>{

    print(`server is running on ${port}`)
    
})