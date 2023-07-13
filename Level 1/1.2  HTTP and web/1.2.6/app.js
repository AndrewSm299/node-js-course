const express = require('express');
const app = express();
const port = 3000;

let counter = -1

app.get('/', (req, res) => {
    counter++
    res.send(`Counter: ${counter}`);
});
  
app.listen(port, () => {
    console.log(`Counter app listening on port ${port}`)
})
