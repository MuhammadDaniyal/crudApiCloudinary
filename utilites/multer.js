const multer = require('multer')
const path = require('path')

// configure multer use storage engine
const upload = multer({
    storage: multer.diskStorage({}), // blank the disStorage
    fileFilter: (req, file, cb) => { // check the file its image or not
        // check extension its img or not
        let extName = path.extname(file.originalname).toLowerCase()
        if (extName !== '.jpg' && extName !== '.jpeg' && extName !== '.png') {
            return cb(new Error("Error: upload images only"), false)
        } else {
            return cb(null, true)
        }
    }
})

module.exports = upload;
