const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const decryptFile = (req, res) => {
  try {
    const encryptedFile = req.files?.file?.[0];
    const bundleFile = req.files?.bundle?.[0];

    if (!encryptedFile || !bundleFile) {
      return res.status(400).json({ error: "Both encrypted file and key bundle are required." });
    }

    // Read and parse the key bundle JSON
    const bundleData = JSON.parse(fs.readFileSync(bundleFile.path, "utf-8"));
    const { key, iv, originalName, mimeType } = bundleData;

    if (!key || !iv) {
      return res.status(400).json({ error: "Invalid key bundle data." });
    }

    const keyBuffer = Buffer.from(key, "hex");
    const ivBuffer = Buffer.from(iv, "hex");

    const inputPath = encryptedFile.path;
    const outputName = `decrypted-${originalName || "output"}`;
    const outputPath = path.join("public", outputName);

    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, ivBuffer);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => {
      // Cleanup uploaded temp files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(bundleFile.path);

      console.log("✅ File decrypted:", outputPath);
      res.download(outputPath, originalName || "file", (err) => {
        if (err) {
          console.error("❌ Error sending file:", err);
        } else {
          // Optional: delete decrypted file after sending
          // fs.unlinkSync(outputPath);
        }
      });
    });

    output.on("error", (err) => {
      console.error("❌ Decryption stream error:", err);
      res.status(500).json({ error: "Decryption failed." });
    });
  } catch (err) {
    console.error("❌ Unexpected error during decryption:", err);
    res.status(500).json({ error: "Unexpected server error." });
  }
};

module.exports = { decryptFile };
