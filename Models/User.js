const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    language:{
        type:String,
        enum:['hi','en']
    },
    role:{
        type:String,
        enum:['admin','farmer'],
        required:true
    }
}) 

module.exports =mongoose.model('User', UserSchema);
