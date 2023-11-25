const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref:'Product'
    },
    artisian: {
        type: mongoose.Types.ObjectId,
        ref:'artisian'
    }
})

module.exports = mongoose.model('Order',orderSchema)
