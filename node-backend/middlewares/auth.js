const Artist = require('../models/artisan');
const User = require ('../models/user');
const bcrypt = require('bcryptjs');

exports.isArtist = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const artist = await Artist.find({email})
        if (!artist) {
            return res.status(403).json({ message: 'You are not authorized to access this page' });
        }
        const isMatch = await bcrypt.compare(password, artist.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'You are not authorized to access this page' });
        }
        req._id = artist._id;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


exports.isUser = async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    try {
        const user = await User.find({email})
        if (!user) {
            return res.status(403).json({ message: 'You are not authorized to access this page' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'You are not authorized to access this page' });
        }
        req._id = user._id;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}