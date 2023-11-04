const express = require('express');
const auth = require("../middlewares/auth");
const {addProduct,updateProduct,getOneProduct,getAllProducts,deleteProduct} = require('../controllers/product')

const router = express.Router()

router.post("/add", auth.isArtist, addProduct)
router.put("/update/:id", auth.isArtist, updateProduct)
router.delete("/delete/:id", auth.isArtist, deleteProduct)
router.get("/one/:id", auth.isArtist, getOneProduct)
router.get("/all", auth.isArtist, getAllProducts)

module.exports = router