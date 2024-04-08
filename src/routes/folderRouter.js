const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const authJWT = require("../middlewares/authJWT");
const refreshJWT = require("../utils/refresh");

router.post("/make", authJWT, folderController.makeFolder);
router.get("/read", authJWT, folderController.readFolder);
router.put("/update", authJWT, folderController.updateFolder);
router.delete("/delete", authJWT, folderController.deleteFolder);
router.get("/refresh", refreshJWT);

module.exports.router = router;
