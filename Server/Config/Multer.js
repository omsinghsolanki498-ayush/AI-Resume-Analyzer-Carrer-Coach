const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "application/pdf") { // file type only pdf
        cb(null,true);  // right =>  true
    }else{
        cb(new error("Only Pdf File Are Allowed"),false); // else error
    }
};

const upload = multer({  // full file inside in upload
    storage ,
    fileFilter,
    limits: {
        filesize:5*1024*1024,  // max 5mb
    },
});

module.exports = upload;