import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/index.js';
import cors from 'cors';
import router from "./routes/index.js"

import globalErrorHandler from './controllers/errorController.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'welcome_message',
  });
});

app.use('/api/v1/', router);

//API Docummentation middleware
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  })
);

//Error handling middleware
app.use(globalErrorHandler);

export default app
