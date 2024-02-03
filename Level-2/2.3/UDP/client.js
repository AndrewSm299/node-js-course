const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const PORT = 3333;
const SERVER_HOST = 'localhost';

function currentTime(){
    return new Date().toLocaleString();
}

const message = 'Text to send to the server';

client.send(message, PORT, SERVER_HOST, (err) => {
    if (err) {
        console.error(`${currentTime()} Client error: ${err}`);
    }
    else {
        console.log(`${currentTime()} Message sent to server: "${message}"`);
    }
});

client.on('message', (msg, rinfo) => {
    console.log(`${currentTime()} Received response from server: "${msg}"`);
    client.close();
});
