const mongoose = require('mongoose');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./config/webpack.config.js');
const express = require('express');
const { exec } = require('child_process');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const config = require('./config/config.json');
const env = process.env;
const compiler = webpack(webpackConfig);
const app = express();
const mongoDB = 'mongodb://homeiot:NzbgZQDsTq2XaH8NGb1E@ds231090.mlab.com:31090/home-iot';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

const routes = require('./app/routes');

app.use('/', routes);

// // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
//
// // The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
//
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
