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

module.exports = {
  getKlaytnVersion,
  generateKeyring,
};
