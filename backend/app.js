const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./webApi/user')
const companyRoutes = require('./webApi/company');
const categoryRoutes = require('./webApi/category');
const menuRoutes = require('./webApi/menu');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(
    (req, res, next) => {
        console.log(req.url);
        next();
    }
)
app.use('/company', companyRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/menu', menuRoutes);

app.use((req, res, next) => {
    res.status(404).send('Route' + req.url + ' Not found.');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

