import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = 3000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3306',
    database: '2997as01AS'
});


db.connect((err: any) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});