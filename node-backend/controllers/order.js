const Order = require('../models/order')
const Product = require('../models/product')
const axios = require('axios')

exports.addOrder = async(customer,product,artisan,qty) => {
    try {
        await Order.create({
            customer,
            product,
            artisan,
            qty
        }).then(async() => {
            const product = await Product.findById(product).exec()
            product.qty -= qty 
            await product.save()
            await axios.post('http://localhost:5000/create-analytics-entry',{
                artisan_id: artisan,
                product_id: product
            })
            return 1
        })
    } catch (error) {
        throw error
    }
}

exports.getOrders = async (req, res) => {
  try {
    // const { artisan } = req.params.id
    const orders = await Order.find({}).populate("product")
    if (!orders) {
      return res.status(200).json("No orders found")
    }
    return res.status(200).json(orders)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
//updating status
exports.updateOrder = async(req, res) => {
    try{
        let orderData = await Order.findById(req.params.id)

        if (!orderData) return res.status(404).json({message: 'Order not found!'})

        await Order.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: orderData},
            {new: true}
        ).then(() => {
            return res.status(200).json({message: "Order Updated!"})
        })
    }catch(error){
        return res.status(500).json(error.message)
    }
}
