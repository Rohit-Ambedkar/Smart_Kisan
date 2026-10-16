const mongoose = require('mongoose');

const AdvisorySchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    type:{
        type:String,
        required:true
    },
    inputsGiven:{
        type:Object,
        required:true
    },
    result:{
        type:Object,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('AdvisoryHistory',AdvisorySchema);