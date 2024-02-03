const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 3333;

function currentTime(){
    return new Date().toLocaleString();
}

server.on('error', (err) => {
    console.error(`${currentTime()}Server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const clientIP = rinfo.address;
    console.log(`Client's IP-Adress : ${rinfo.address}`);
    console.log(`${currentTime()} Recieved "${msg}" from ${rinfo.address}:${rinfo.port}`);
    const responseMessage = msg;
    server.send(responseMessage, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`${currentTime()} Error sending response to client: ${err}`);
        }
        else {
            console.log(`${currentTime()} Response sent to ${rinfo.address}:${rinfo.port}: "${responseMessage}"`);
        }
    });
});


server.on('listening', () => {
    const address = server.address();

    console.log(`${currentTime()} UDP Server listening on ${address.address}:${address.port}`);
});

server.bind(PORT);