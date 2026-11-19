const mongoose = require("mongoose");

const cropQuerySchema = new mongoose.Schema({
    farmerId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    cropName: {type: String,required: true},
    problemDescription: {type: String,required: true},
    imageBuffer: {type: Buffer,required: false},
    imageType:{type: String,required: false},
    status: {type: String,enum: ['pending', 'resolved'],default: 'pending'  },
    solution: {diagnosis:String,remedy:String,
    solvedBy: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    updatedAt: Date
    }
},
 { timestamps: true}
);

module.exports = mongoose.model("CropQuery", cropQuerySchema);