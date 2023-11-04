const mongoose = require('mongoose')

const artisanSchema = new mongoose.Schema({
    name: {
        en: String,
        gu: String
    },
    age: Number,
    address: {
        en: String,
        gu: String
    },
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