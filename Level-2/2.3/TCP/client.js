const net = require('net');

const client = new net.Socket();

const PORT = 8080;
const HOST = '127.0.0.1';

function currentTime(){
  return new Date().toLocaleString();
}

client.connect(PORT, HOST, () => {
  console.log(`${currentTime()} Connected to server`);
  client.write(`Text to send here`);
  client.end();
});

client.on('data', (data) => {
  console.log(`${currentTime()} Received data from server: ${data}`);
});

client.on('close', () => {
  console.log(`${currentTime()} Connection to server closed`);
});