const net = require('net');

const client = new net.Socket();

const PORT = 8080;
const HOST = '127.0.0.1';

client.connect(PORT, HOST, () => {
  console.log('Connected to server');
  client.write('Text to send here');
});

client.on('data', (data) => {
  console.log(`Received data from server: ${data}`);
});

client.on('close', () => {
  console.log('Connection to server closed');
});
