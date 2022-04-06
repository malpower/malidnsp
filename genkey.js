const fs=require("fs");
const crypto=require("crypto");




const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: process.argv[2]
  },
});

  fs.writeFileSync(`${__dirname}/pub.key`, publicKey);
  fs.writeFileSync(`${__dirname}/priv.key`, privateKey);