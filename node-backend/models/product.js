const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        en: String, 
        gu: String,
    },
    description: {
        en: String,
        gu: String,
    },
    images:[
        {
            name:String,
            url:String
        }
    ],
    price:Number,
    model:String
}, {timestamps: true})

module.exports = mongoose.model('Product',productSchema)