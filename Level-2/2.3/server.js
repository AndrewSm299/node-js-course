const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let requestData = '';

    req.on('data', (chunk) => {
      requestData += chunk;
    });

    req.on('end', () => {
      console.log('Received data from the client:', requestData);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(requestData);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
