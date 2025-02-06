require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};



app.get('/', function (req, res) {
  const client = new Client(dbConfig);
  client
    .connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');

      client.query('select * from people', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          res.json(result.rows);
        }

        client
          .end()
          .then(() => {
            console.log('Connection to PostgreSQL closed');
          })
          .catch((err) => {
            console.error('Error closing connection', err);
          });
      });
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
})

app.listen(3000, () => console.log('Server started!'));