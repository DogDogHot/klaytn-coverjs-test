const express = require("express");
const fs = require("fs");
const Caver = require("caver-js");
const caver = new Caver("https://kaikas.baobab.klaytn.net:8651/");
const klaytnController = require("../controller/klaytn.controller.js");
const router = express.Router();
const { secretKey } = require("../config/secretKey.json");
const account = caver.klay.accounts.wallet.add(secretKey);

router.get("/version", klaytnController.getKlaytnVersion);

router.post("/keyring", klaytnController.generateKeyring);

router.get("/balance", async function (req, res, next) {
  const { walletKey } = req.query;

  const balance = await caver.klay.getBalance(walletKey);

  res.json({
    code: 2000,
    data: { balance: caver.utils.fromPeb(balance, "KLAY") },
    msg: "get wallet balance",
  });
});

router.post("/balance", async function (req, res, next) {
  const { address } = req.body;

  try {
    let response = await caver.klay.sendTransaction({
      type: "VALUE_TRANSFER",
      from: account.address,
      to: address,
      gas: "21000",
      value: caver.utils.toPeb("1", "KLAY"),
    });
    console.log(response);
    res.json({
      code: 2000,
      msg: "post wallet balance",
    });
  } catch (e) {
    console.log(e);
    res.code(400).json({
      code: 4000,
      msg: "fail post wallet balance",
    });
  }
});
module.exports = router;
