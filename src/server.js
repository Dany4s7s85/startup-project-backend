import app from './app.js';
import config from './config/config.js';

// const currentConfig = config[process.env.NODE_ENV];
// const { port } = currentConfig;
const port = 8080;


app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);
