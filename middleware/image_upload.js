const multer = require("multer");
let path = require('path');
const fs = require("fs");
const mime = require("mime");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("base directory", __dirname + '..')
        cb(null, path.join(__dirname, '..' + "/public/media/thumbnail"));
    },
    filename: (req, file, cb) => {
        cb(null, randomStr(10) + "." +
            file.originalname.split(".").pop());
    },
});

let uploadFile = multer({ storage: storage });
module.exports = uploadFile;

module.exports.uploadBase64 = async function (base64image, callback) {
    let imageBuffer = base64image;
    let fileName = randomStr(10) + ".png";
    const path1 = path.join(__dirname, '..' + "/public/media/thumbnail/") + fileName;

    fs.writeFile(path1, imageBuffer, 'base64', function (err) {
        if (!err) {
            callback(fileName);
        }else{
            callback(null);
        }
    });
}