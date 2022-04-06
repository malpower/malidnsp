const fs=require("fs");
const crypto=require("crypto");




const {
    publicKey,
    privateKey,
  } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  });

  fs.writeFileSync(`${__dirname}/pub.key`, publicKey);
  fs.writeFileSync(`${__dirname}/priv.key`, privateKey);