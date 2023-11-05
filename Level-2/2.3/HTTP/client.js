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

const req = http.request(options, (res) => {
    let data = 'Some text to send to the server';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const endTime = Date.now();

        console.log('Response from server:', data);
        console.log('Time elapsed (ms):', endTime - startTime);
    });
});

req.on('error', (error) => {
    console.error('Request error:', error);
});

req.end();
