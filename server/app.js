const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');

const app = express();
require('dotenv').config();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

var indexRouter = require('./routes/index');
var appRouter = require('./routes/app');

app.use('/', indexRouter);
app.use('/app', appRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server online on PORT: ${process.env.PORT}`)
})