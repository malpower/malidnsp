const UDP=require("dgram");
const crypto=require("crypto");
const fs=require("fs");
const key=fs.readFileSync(`${__dirname}/priv.key`).toString("utf8");


const server=UDP.createSocket("udp4", (packet, remote)=>
{
    let decrypted;
    try
    {
        decrypted=crypto.privateDecrypt({key, passphrase: process.argv[4]}, packet);
    }
    catch (e)
    {
        console.log(e.message);
        return;
    }
    let s=UDP.createSocket("udp4", (rp)=>
    {
        console.log("resolved", remote.address);
        server.send(crypto.privateEncrypt({key, passphrase: process.argv[4]}, rp), remote.port, remote.address);
        s.close();
    });
    s.send(decrypted, 53, process.argv[2]);
    s.on("error", (e)=>
    {
        console.log(e.message);
    });
});
server.bind(Number.parseInt(process.argv[3]), ()=>
{
    console.log("DNS ON.");
});