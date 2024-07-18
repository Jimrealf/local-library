const express = require('express');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/books');
const indexRoutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/books', bookRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
