const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const encryptFile = (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📥 File received:", file.originalname);

    const key = crypto.randomBytes(32); // AES-256
    const iv = crypto.randomBytes(16);  // IV

    const inputPath = file.path;
    const outputPath = `${file.path}.enc`;

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    const bundle = {
        key: key.toString("hex"),
        iv: iv.toString("hex"),
        originalName: file.originalname,
        mimeType: file.mimetype,
        encryptedName: path.basename(outputPath),
      };
      
    const bundleFilename = `${path.basename(file.filename)}-keybundle.json`;
    const bundlePath = path.join("public", bundleFilename); // ✅ FIX
    
    fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2));

    output.on("finish", () => {
      fs.unlinkSync(inputPath); // optional cleanup

      console.log("✅ File encrypted:", outputPath);

      res.json({
        message: "File encrypted successfully",
        encryptedFile: `/public/${path.basename(outputPath)}`,
        keyBundleFile: `/public/${bundleFilename}`,
      });
    });

    output.on("error", (err) => {
      console.error("❌ Output stream error:", err);
      res.status(500).json({ error: "Encryption failed" });
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
};

module.exports = { encryptFile };
