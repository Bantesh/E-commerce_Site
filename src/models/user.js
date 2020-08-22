const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Not contains password')
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('unable to login email')
    }
    const ismatch = await bcrypt.compare(password, user.password)
    if (!ismatch) {
        throw new Error('unable to login')
    }
    return user
}
userSchema.methods.comparePassword = async function(password) {
   
   return await bcrypt.compare(password, this.password)
}
userSchema.pre('save', async function(next){
    const user = this;
    user.password = await bcrypt.hash(user.password, 8)
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User