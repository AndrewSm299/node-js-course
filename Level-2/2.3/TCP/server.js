const net = require('net');

function currentTime(){
  return new Date().toLocaleString();
}

const server = net.createServer((socket) => {
  const userIP = socket.remoteAddress;
  console.log(`${currentTime()} Client connected`);
  console.log(`Client's IP-adress: ${userIP}`)

  socket.on('data', (data) => {
    console.log(`${currentTime()} Received data from client: ${data}`);
    socket.write(`${data}`);
  });

  socket.on('end', () => {
    console.log(`${currentTime()} Client disconnected`);
  });
});

const PORT = 8080;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`${currentTime()} Server is listening on ${HOST}:${PORT}`);
});
