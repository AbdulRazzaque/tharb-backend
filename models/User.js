const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    email:{type:String,default:""},
    password:{type:String,default:""}
},{timestamps:true})

const User = new Mongoose.model("User",userSchema);
module.exports = User;