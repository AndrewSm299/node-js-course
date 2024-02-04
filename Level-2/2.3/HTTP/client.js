const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
};

const startTime = Date.now();

function getInfo() {
  const infoString = new Date().toLocaleString();
  return infoString;
}

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const endTime = Date.now();

    console.log(`${getInfo()} Response from server: ${data}`);
    console.log(`${getInfo()} Time elapsed (ms): ${endTime - startTime}`);
  });
  res.on('close', () => {
    console.log(`${getInfo()} Connection has been closed.`);
  });
});

req.on('error', (error) => {
  console.error(`${getInfo()} Request error: ${error}`);
});

req.write('Text to send to the server');
req.end();
