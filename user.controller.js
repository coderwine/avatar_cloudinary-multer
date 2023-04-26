const router = require('express').Router();
const User = require('./user.model');
// MULTER
const upload = require('./helpers/multer');
const cloudinary = require('./helpers/cloud');

const uploadImage = async (imagePath) => {
    const option = {
        use_filename: true,
        unique_filename: false,
        overwrite: true
    }

    try {
        
        const result = await cloudinary.uploader.upload(imagePath, option)
        const url = await result.secure_url;
        console.log('RESULT: ', url)
        return url;

    } catch (err) {
        console.error(err);
    }
}

router.post('/', upload.single('avatar'), async(req, res) => {
    try {

        const cloud_url = await uploadImage(req.file.path)
        console.log(cloud_url)

        const user = new User({
            name: req.body.name,
            avatar: cloud_url ? cloud_url : ""
        });

        const newUser = await user.save();

        res.status(200).json({
            newUser
        });

    } catch (err) {
        res.send(500).json({
            Error: err.message
        })
    }
});

module.exports = router;