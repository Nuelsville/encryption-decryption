const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { encryptFile } = require("../controllers/encrypt/encrypt.controller");

/**
 * @swagger
 * /encrypt:
 *   post:
 *     summary: Encrypt a file using AES
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Encrypted file and key bundle
 */
router.post("/", upload.single("file"), encryptFile);

module.exports = router;
