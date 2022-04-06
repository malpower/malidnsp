const UDP=require("dgram");
const crypto=require("crypto");
const fs=require("fs");
const key=fs.readFileSync(`${__dirname}/priv.key`).toString("utf8");


const server=UDP.createSocket("udp4", (packet, remote)=>
{
    let decrypted=crypto.privateDecrypt(key, packet);
    let s=UDP.createSocket("udp4", (rp)=>
    {
        server.send(crypto.privateEncrypt(key, rp), remote.port, remote.address);
        s.close();
    });
    s.send(decrypted, 53, process.argv[2]);

});
server.bind(Number.parseInt(process.argv[3]), ()=>
{
    console.log("DNS ON.");
});