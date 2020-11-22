const http = require('http');

const { connectDb } = require('./config/db');

const port = process.env.PORT || 3000;

const app = require('./app');

const server = http.createServer(app);

connectDb().then(
  () => server.listen(port),
  (err) => console.log(`Fail to start server ${err}`)
);
