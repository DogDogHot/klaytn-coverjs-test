const Caver = require("caver-js");
const caver = new Caver("https://kaikas.baobab.klaytn.net:8651/");

const { secretKey } = require("../config/secretKey.json");
const account = caver.klay.accounts.wallet.add(secretKey);

const getKlaytnVersion = async (req, res, next) => {
  try {
    const version = await caver.rpc.klay.getClientVersion();
    console.log(version);
    res.json({ code: 2000, data: { version }, msg: "get version" });
  } catch (e) {
    res.status(500).json({ code: 5000, msg: "klaytn error" });
  }
};

const generateKeyring = async (req, res, next) => {
  try {
    const keyring = caver.wallet.keyring.generate();
    console.log(keyring);
    res.json({ code: 2000, msg: "generate keyring" });
  } catch (e) {
    res.status(500).json({ code: 5000, msg: "klaytn error" });
  }
};

const getBalance = async (req, res, next) => {
  const { walletKey } = req.query;
  try {
    const balance = await caver.klay.getBalance(walletKey);

    res.json({
      code: 2000,
      data: { balance: caver.utils.fromPeb(balance, "KLAY") },
      msg: "get wallet balance",
    });
  } catch (e) {
    res.status(500).json({ code: 5000, msg: "klaytn error" });
  }
};

const sendBalance = async (req, res, next) => {
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
};

module.exports = {
  getKlaytnVersion,
  generateKeyring,
  getBalance,
  sendBalance,
};
