require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

console.log('meowther');
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.set('view engine', 'ejs');
// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.get('/', (req, res) => {
  console.log('Here');
  // res.download('server.js');
  // res.status(500).json({ message: 'Error' });
  res.render('index', { text: 'World' });
});

const userRouter = require('./routes/users');
const customersRouter = require('./routes/customers');

app.use('/customers', customersRouter);
app.use('/users', userRouter);


function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}
app.listen(8080);