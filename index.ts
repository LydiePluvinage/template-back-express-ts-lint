import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { handleError } from './helpers/errors';
import setupRoutes from './router';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// à faire des requetes axios
const corsOptions: cors.CorsOptions = {
  origin: ['*', 'https://test-deploy-fullstack.vercel.app/'],
  credentials: true,
  exposedHeaders: ['agreementrequired', 'Content-Range'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'PUT', 'POST'],
};

// middleware cors
app.use(cors(corsOptions));

//middleware perso pour ajouter les headers nécessaires à react-admin et vercel
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

//middleware pour lire le body
app.use(express.json());
//middleware pour envoyer des cookies
app.use(cookieParser());

setupRoutes(app);

// A mettre à la fin pour gèrer les erreurs qui sortiront des routes
app.use(handleError);

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`server is listening on ${port}`);
  /* eslint-enable no-console */
});
