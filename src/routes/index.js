import express from 'express';
import userRoutes from './userRoutes/userRoutes.js';
import codexapiRoutes from './userRoutes/codexapiRoutes.js';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/translator', codexapiRoutes);


export default routes;
