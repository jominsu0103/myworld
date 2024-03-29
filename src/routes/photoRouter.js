const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photoController");

router.post("/upload", photoController.uploadPhoto);
router.get("/", photoController.totalPhoto);
router.delete("/", photoController.removePhoto);

module.exports.router = router;
