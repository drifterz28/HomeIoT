const fs = require('fs');
const env = process.env;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./config/webpack.config.js');
const compiler = webpack(webpackConfig);

const express = require('express');
const app = express();

const { exec } = require('child_process');
const config = require('./config.json');

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// const tempTrack = require('./modals/temp-track');

app.set('port', (process.env.PORT || 80));

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('good');
});

// app.get('/temp-track', (req, res) => {
//   tempTrack(req, res);
// });

app.get('/tv', (req, res) => {
  if(req.query.key === config.apiKey) {
    exec('curl http:\/\/192.168.0.27\/');
    res.send('done');
  } else {
    res.send('failed');
  }
});


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
