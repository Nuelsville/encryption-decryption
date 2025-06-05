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
  // Define allowed MIME types inlcude docs, spreeds, and other common file types
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/rtf",
        "application/xml",
        "application/zip",
        "application/x-zip-compressed",
        "application/x-rar-compressed",
        "image/gif",
        "image/png",
        "image/jpeg",
        "text/plain",
        "text/csv",
        "text/html",
        "text/css",
        "text/javascript",
        "application/json",
        "application/octet-stream",
        "application/zip",
        "application/x-zip-compressed",
        "application/x-rar-compressed",
        "application/x-tar",
        "application/x-7z-compressed",
        "application/x-bzip",
    ];
      
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, true);
    // cb(new Error("Unsupported file type."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1000 }, // 1GB max
  fileFilter,
});

module.exports = upload;
