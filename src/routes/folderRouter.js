const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");

router.post("/make", folderController.makeFolder);
router.get("/read", folderController.readFolder);
router.put("/update", folderController.updateFolder);
router.delete("/delete", folderController.deleteFolder);

module.exports.router = router;
