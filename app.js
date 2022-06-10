const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const compression = require("compression");
const cors = require("cors-express");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const branchRouter = require("./routes/branch");
const rootRouter = require("./routes/root");

const app = express();
dotenv.config();

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const options = {
  allow: {
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    headers: "Content-Type, Authorization",
  },
  max: {
    age: null,
  },
};

app.use(cors(options));
app.use(compression());

app.use(express.json());
app.use(multer({ storage: store }).any());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(process.env.api, authRouter);
app.use(process.env.api, branchRouter);
app.use(process.env.api, rootRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ success: false, message: message });
});

mongoose
  .connect(process.env.mongoDBUri)
  .then((result) => {
    const server = app.listen(process.env.PORT, "localhost", () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
