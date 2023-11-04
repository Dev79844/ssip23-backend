const express = require('express');
const auth = require("../middlewares/auth");
const {addProduct,updateProduct,getOneProduct,getAllProducts,deleteProduct} = require('../controllers/product')

const router = express.Router()

router.post("/product/add", auth.isArtist, addProduct)
router.put("/product/update/:id", auth.isArtist, updateProduct)
router.delete("/product/delete/:id", auth.isArtist, deleteProduct)
router.get("/product/one/:id", auth.isArtist, getOneProduct)
router.get("/product/all", auth.isArtist, getAllProducts)

module.exports = router