const Product = require('../models/product')
const { uploadImages } = require('../utils/uploadImage')
require('dotenv').config()

//for en to gu translation
const translateEnToGu = async(textData) => {
    let resData = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`,  
    { 
        q: textData, target: "gu"
    });  
    
    let textGu = resData.data.data.translations[0].translatedText;  
    return textGu
}

//for gu to en translation
const translateGuToEn = async(textData) => {
    let resData = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`,  
    { 
        q: textData, target: "en"
    });  
    
    let textEn = resData.data.data.translations[0].translatedText;  
    return textEn
}

exports.addProduct = async(req,res) => {
    try {
        const {name,price,description} = req.body 
        const images = req.files.images, nameEn = name.en, descEn = description.en, nameGu = name.gu, descGu = description.gu
        let urlArr=[]

        if(!name || !price || !description){
            return res.status(400).json({message: "Please enter all details!"})
        }

        if(req.files.images){
            urlArr = await uploadImages(res,req.files.images)
        }

        //call functions for inter-translation of name and desc btw en and gu
 
        if (nameEn.length >= 1)
            nameGu = await translateEnToGu(nameEn)
        else 
            nameEn = await translateGuToEn(nameGu)
        
        if (descEn.length >= 1)
            descGu = await translateEnToGu(descEn)
        else
            descEn = await translateGuToEn(descGu)
        

        await Product.create({
            name: {en: nameEn, gu: nameGu},
            price,
            description: {en: descEn, gu: descGu},
            images: urlArr,
        }).then(() => {
            return res.status(200).json({message: "OK"})
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

//update product endpoint being added --> need product object id in params
exports.updateProduct = async(req, res) => {
    try{
        //fetch existing product from product collection from db
        let productData = await Product.findById(req.params.id)

        //if product not found even if id is sent --> to handle incorrect ids
        if (!productData)   return res.status(404).json({message: "Product Not Found!"})

        //check and modify fetched data accordingly
        productData.price = (req.body.price) ?    req.body.price   :   productData.price; 

        //check translation of Data
        productData.name = (req.body.name) ?    req.body.name   :   productData.name;
        productData.description = (req.body.description) ?    req.body.description   :   productData.description; 
        
        let nameEn = productData.name.en, nameGu = productData.name.gu, descGu = productData.description.gu, descEn = productData.description.en

        //if name is in english
        if (nameEn.length >= 1){
            productData.name.gu = await translateEnToGu(nameEn)
        }
        //if name in gujarati
        else{
            productData.name.en = await translateGuToEn(nameGu)
        }

        //if desc is in english
        if (descEn.length >= 1){
            productData.description.gu = await translateEnToGu(descEn)
        }
        //if desc in gujarati
        else{
            productData.description.en  = await translateGuToEn(descGu)
        }

        // productData.images = (req.body.images) ?    req.body.images   :   productData.images;

        if(req.files.images){
            productData.images.forEach(async(image) => {
                let params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key:image.key
                }
                const command = new DeleteObjectCommand(params)
                await s3Client.send(command)
            })

            await uploadImages(res,req.files.images)
        }

        //update the object based on obj id
        await Product.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: productData},
            {new: true}
        ).then(() => {
            return res.status(200).json({message: "Product Updated!"})
        })
    }catch(error){
        return res.status(500).json(error)
    }
}

//delete product endpoint being added --> need product object id in params
exports.deleteProduct = async(req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        .then(() => {
            return res.status(200).json({message: "Product Deleted!"})
        })
    }catch(error){
        return res.status(500).json(error)
    }
}

//endpoint to get one product --> pass obj id in param
exports.getOneProduct = async(req, res) => {
    try{
        let productData = await Product.findById(req.params.id)

        //in case product not found
        if (!productData)   return res.status(404).json({message: "Product Not Found!"})

        //in case product is found
        return res.status(200).json({message: "Product found!", productData})
    }catch(error){
        return res.status(500).json(error)
    }
}

//endpoint to get all products in inventory
exports.getAllProducts = async(req, res) => {
    try{
        let productsData = await Product.find()

        //returning all products data
        return res.status(200).json({message: "Products found!", productsData})
    }catch(error){
        return res.status(500).json(error)
    }
}