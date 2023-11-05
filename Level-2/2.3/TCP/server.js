const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
    socket.write('You send this text to the server: ' + data);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

const PORT = 8080;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${HOST}:${PORT}`);
});
