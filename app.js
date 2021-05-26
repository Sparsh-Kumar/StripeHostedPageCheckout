
require ('dotenv').config ();
const mongoose = require ('mongoose');
const express = require ('express');
const hbs = require ('hbs');
const bodyParser = require ('body-parser');
const port = process.env.PORT || 80;
const path = require ('path');
const { RouteHandler } = require (path.resolve (__dirname, 'routes', 'RouteHandler'));

mongoose.Promise = global.Promise;
mongoose.connect (process.env.MONGO_DATABASE_URL).then (() => {
    console.log (`Database Connected ${process.env.MONGO_DATABASE_URL}`);
}).catch ((error) => {
    console.log (`Database Connection Error: ${error.message}`)
})


const app = express ();
app.use (bodyParser.json ({ limit: '10kb' }));
app.use (express.static (path.resolve (__dirname, 'public')));
app.set ('view engine', 'hbs');
hbs.registerPartials (path.resolve (__dirname, 'views', 'partials'));

app.use ('/api', RouteHandler);
app.listen (port, () => {
    console.log (`http://localhost:${port}`);
})