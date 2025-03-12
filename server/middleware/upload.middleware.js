import multer from "multer";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set your desired folder
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname); // Use current timestamp + original filename
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

export default upload;