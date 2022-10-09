const express = require('express')
const router = express.Router()
const upload = require('../utilites/multer')
const cloudinary = require('../utilites/cloudinary')
const User = require('../models/userSchema')


// Route 1: Post request - upload a image on cloudinary then save url in mongodb
router.post('/', upload.single('testImg'), async (req, res) => {
    try {
        if (!req.file) {
            res.send('Error: select the image')
        } else {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'AIC_Folder' }) // upload a img on cloudinary - req.file.path means original path sy uthae apka computer sy
            const imgDoc = User({
                name: req.body.name,
                image: result.secure_url,  // recieve from cloudinary response
                cloudinary_id: result.public_id,
            })
            const response = await imgDoc.save()
            res.json(response)
            // console.log(req.file);
        }
    } catch (error) {
        console.log(error);
    }
})

// Route - 2 : Retrive All the user info with img url from mongodb
router.get('/', async (req, res) => {
    try {
        const response = await User.find({})
        res.json(response)
    } catch (error) {
        res.json({ error })
    }
})

// Route - 3 : Delete a user in mongodb and delete a image from cloudinary
router.delete('/', async (req, res) => {
    try {
        // find user by id
        const userDoc = await User.findByIdAndDelete(req.query.id)
        // Delete img from cloudinary
        const userImgCloud = await cloudinary.uploader.destroy(userDoc.cloudinary_id, { folder: 'AIC_Folder' }) // destroy take public_id of cloudinary which save in mongodb also 
        res.json({ userDoc, userImgCloud })
    } catch (error) {
        res.json({ error })
    }
})

// Route - 3 : Update a user in mongodb and Update a image from cloudinary
router.put('/', upload.single('testImg'), async (req, res) => {
    try {
        // find user by id
        const userDoc = await User.findById(req.query.id)
        // Delete img from cloudinary
        const userImgCloud = await cloudinary.uploader.destroy(userDoc.cloudinary_id, { folder: 'AIC_Folder' }) // destroy take public_id of cloudinary which save in mongodb also 
        // update Doc
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'AIC_Folder' }) // destroy take public_id of cloudinary which save in mongodb also 
        const newUser = {
            name: req.body.name || userDoc.name,
            image: result.secure_url || userDoc.image,
            cloudinary_id: result.public_id || userDoc.cloudinary_id,
        }
        const newUserDoc = await User.findByIdAndUpdate(req.query.id, newUser, { new: true })
        res.json(newUserDoc)
    } catch (error) {
        res.json({ error })
    }
})

module.exports = router