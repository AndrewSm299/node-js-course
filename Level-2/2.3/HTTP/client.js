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

function currentTime(){
    return new Date().toLocaleString();
}

const req = http.request(options, (res) => {
    let data = 'Text to send to the server';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const endTime = Date.now();

        console.log(`${currentTime()} Response from server: ${data}`);
        console.log(`${currentTime()} Time elapsed (ms): ${endTime - startTime}`);
    });
});

req.on('error', (error) => {
    console.error(`${currentTime()} Request error: ${error}`);
});

req.end();
