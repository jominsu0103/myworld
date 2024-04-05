const express = require("express");
const path = require("path");
const router = express.Router();
const photoController = require("../controllers/photoController");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.post("/upload", upload.single("photo"), photoController.uploadPhoto);
router.get("/", photoController.totalPhoto);
router.delete("/", photoController.removePhoto);

module.exports.router = router;
