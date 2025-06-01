const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Define storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "text/plain",
        "application/json",
        "application/octet-stream"
    ];
      
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1000 }, // 1GB max
  fileFilter,
});

module.exports = upload;
