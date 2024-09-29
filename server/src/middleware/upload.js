const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname, "../../../client/public/upload");
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const replacedStr = file.originalname.replace(/ /g, "_");
        cb(null, file.fieldname + "_" + Date.now() + "_" + replacedStr);
    },
});

const fileFilter = (req, file, cb) => {
    const lessonType = req.body.lesson_type;

    const pdfMIME = ['application/pdf'];
    const videoMIME = ['video/mp4', 'video/mkv', 'video/webm'];
    const thumbnail_preview_image_url = ['image/jpeg', 'image/png', 'image/jpg'];

    if (lessonType === 'pdf' && pdfMIME.includes(file.mimetype)) {
        cb(null, true);
    } else if (lessonType === 'video' && videoMIME.includes(file.mimetype)) {
        cb(null, true);
    } else if (lessonType === 'thumbnail_preview_image_url' && thumbnail_preview_image_url.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type for lesson type: ${lessonType}.`), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
