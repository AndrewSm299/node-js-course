const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 3333;

server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const currentTime = new Date().toLocaleString();
    console.log(`${currentTime} ${msg} from ${rinfo.address}:${rinfo.port}`);
    const responseMessage = msg;
    server.send(responseMessage, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error(`${currentTime} Error sending response to client: ${err}`);
        }
        else {
            console.log(`${currentTime} Response sent to ${rinfo.address}:${rinfo.port}: ${responseMessage}`);
        }
    });
});


server.on('listening', () => {
    const address = server.address();
    const currentTime = new Date().toLocaleString();

    console.log(`${currentTime} UDP Server listening on ${address.address}:${address.port}`);
});

server.bind(PORT);
