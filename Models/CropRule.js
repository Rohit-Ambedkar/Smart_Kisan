const mongoose = require('mongoose');

const CropRuleSchema = mongoose.Schema({
    cropname:{
        type:String,
        enum:['hi','en']
    },
    suitablesoils:{
        type:[String],
        required:true

    },
    season:{
        type:String,
        required:true
    },
    tempRange:{
        min:{type:Number,required:true},
        max:{type:Number,required:true}
    }
})

module.exports= mongoose.model('cropRule',CropRuleSchema);