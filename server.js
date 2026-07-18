const express = require('express');
const app = express();

require('dotenv').config();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to our hotel Vishal_ColdDrink');
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Successfully running server on port ${PORT}`);
});