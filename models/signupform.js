const mongoose = require('mongoose')

const signupschema = mongoose.Schema({
    cemail:String,
    cusername:String,
    cpassword:String
})

module.exports = mongoose.model('signupform',signupschema)