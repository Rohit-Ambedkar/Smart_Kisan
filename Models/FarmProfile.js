const mongoose = require('mongoose');
const FarmProfile = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    location:{
        type:String,
        required:true
    },
    soilType:{
        type:String,
        enum:['loamy','black','sandy','alluvial'],
        required:true
    },
    currentseason:{
        type:String,
        enum:['rabi','kharif','zaid'],
        required:true

    },
    landsize:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Fprofile',FarmProfile);