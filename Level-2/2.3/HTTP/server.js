const http = require('http');

const port = 3000;

function getInfo(){
  return new Date().toLocaleString();
}

const server = http.createServer((req, res) => {
  const clientIP = req.connection.remoteAddress;
  if (req.method === 'POST') {
    let requestData = '';

    req.on('data', (chunk) => {
      requestData += chunk;
    });

    req.on('end', () => {
      console.log(`${getInfo()} Connection from IP: ${clientIP}`);
      console.log(`${getInfo()} Received data from the client:${requestData}`);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(requestData);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`${getInfo()} Server listening on port ${port}`);
});
