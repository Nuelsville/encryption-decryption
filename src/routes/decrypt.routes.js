const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { decryptFile } = require("../controllers/decrypt/decrypt.controller");

/**
 * @swagger
 * /decrypt:
 *   post:
 *     summary: Decrypt an encrypted file using AES
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Encrypted .enc file to decrypt
 *               bundle:
 *                 type: string
 *                 format: binary
 *                 description: JSON key bundle file containing AES key, IV, and metadata
 *     responses:
 *       200:
 *         description: Decrypted file sent as download
 *       400:
 *         description: Missing files or invalid key bundle
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "bundle", maxCount: 1 },
  ]),
  decryptFile
);

module.exports = router;
