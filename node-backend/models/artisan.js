const mongoose = require('mongoose')

const artisanSchema = new mongoose.Schema({
    name:String,
    age: Number,
    gender:{
        type:String,
        enum: ["male", "female"]
    },
    address: String,
    mobile: String,
    password:String,
    products:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ],
    totalProfit: Number
}, {timestamps: true})

module.exports = mongoose.model('Artisan', artisanSchema)