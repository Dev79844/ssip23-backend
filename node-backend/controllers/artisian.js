const Artisian = require('../models/artisian');

exports.getArtisian = async (req, res)=>{
    const id = req._id;
    try {
        const artist = await Artisian.findById(id, {name: 1, mobile: 1, age: 1, address:1, _id: 0});
        if(!artist)
            return res.status(400).json({msg: "Artisian not found"})
        res.status(200).json(artist);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message": "It's not you. It's us. We are having some problems. Please try again later."
        })
    }
}