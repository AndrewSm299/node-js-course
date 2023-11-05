const net = require('net');

const client = new net.Socket();

const PORT = 8080;
const HOST = '127.0.0.1';

function newCurrentTime(){
  return new Date().toLocaleString();
}

client.connect(PORT, HOST, () => {
  console.log(`${newCurrentTime()} Connected to server`);
  client.write(`${newCurrentTime()} Text to send here`);
});

client.on('data', (data) => {
  console.log(`${newCurrentTime()} Received data from server: ${data}`);
});

client.on('close', () => {
  console.log(`${newCurrentTime()} Connection to server closed`);
});
