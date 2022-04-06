const UDP=require("dgram");
const crypto=require("crypto");
const fs=require("fs");
const key=fs.readFileSync(`${__dirname}/pub.key`).toString("utf8");


const server=UDP.createSocket("udp4", (packet, remote)=>
{
    console.log(`working... query from ${remote.address}`);
    let encrypted=crypto.publicEncrypt(key, packet);
    let s=UDP.createSocket("udp4", (rp)=>
    {
        try
        {
            server.send(crypto.publicDecrypt(key, rp), remote.port, remote.address);
        }
        catch (e)
        {
            console.log(e.message);
        }
        s.close();
    });
    s.send(encrypted, Number.parseInt(process.argv[3]), process.argv[2]);

});
server.bind(53, ()=>
{
    console.log("DNS ON.");
});
server.on("error", (e)=>
{
    console.log(e);
});