const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const encryptRoutes = require("./routes/encrypt.routes");
const decryptRoutes = require("./routes/decrypt.routes");
const contactRoutes = require("./routes/contact.routes");

dotenv.config();

const app = express();
// const __dirname = path.resolve();

// Middlewares
// app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/encrypt", encryptRoutes);
app.use("/decrypt", decryptRoutes);
// app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
