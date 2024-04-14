const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./Uploads/posters");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

function eventposter() {
    return {
        async Uploadposter(req, res) {
            try {
                // Include multer middleware to handle file upload
                const uploadPostFiles = upload.single('file');
                uploadPostFiles(req, res, function(err) {
                    if (err) {
                        console.error('Error uploading file:', err);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    if (!req.file) {
                        return res.status(400).json({ message: 'No file uploaded' });
                    }
                    return res.status(201).json({ path: req.file.path, message: 'File uploaded successfully' });
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
}

module.exports = eventposter;

