const fs = require('fs');
const env = process.env;
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 80));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('good');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
