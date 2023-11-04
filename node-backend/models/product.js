const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        en: String,
        gu: String
    },
    price:Number,
    description: {
        en: String,
        gu: String
    },
    images:[
        {
            name:String,
            url:String
        }
    ],
    model:String,
    quantity:Number,
}, {timestamps: true})

module.exports = mongoose.model('Product',productSchema)