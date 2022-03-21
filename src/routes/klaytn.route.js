const express = require("express");
const klaytnController = require("../controller/klaytn.controller.js");

const router = express.Router();

router.get("/version", klaytnController.getKlaytnVersion);
router.post("/keyring", klaytnController.generateKeyring);
router.get("/balance", klaytnController.getBalance);
router.post("/balance", klaytnController.sendBalance);

module.exports = router;
