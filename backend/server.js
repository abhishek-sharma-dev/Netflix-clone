const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'netflixsignup_database'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users_database (username, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    console.log('Executing SQL query:', sql);
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query: ', err);
            return res.status(500).json({ error: 'Error signing up user' });
        }
        console.log('User signed up successfully');
        return res.json({ message: 'User signed up successfully' });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users_database WHERE email = ? AND password = ?";

    console.log('Executing SQL query:', sql);
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error executing SQL query: ', err);
            return res.status(500).json({ error: 'Error login user' });
        }
        else if (data.length > 0){
            console.log('User login successfully');
            return res.json({message: 'Successfully Login'})
        }
        else{
            return res.json({ message: 'Login Failed' });

        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
