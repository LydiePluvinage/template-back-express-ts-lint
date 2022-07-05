import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorHandler } from '../helpers/errors';
import IMovie from '../interfaces/IMovie';
import { getMovieByTitle, createMovie } from '../models/movie';

const validateMovie = (req: Request, res: Response, next: NextFunction) => {
  // déclare une variable qui est initialisée à optional
  let required: Joi.PresenceMode = 'optional';
  // si la requête utilisateur est un POST, les champs passent
  // en required
  if (req.method === 'POST') {
    required = 'required';
  }
  // crée l'objet movie qui va récupèrer tout ce qui est dans body
  const movie = req.body as IMovie;

  // s'il y a des erreurs joi, mets les dans "errors"
  const errors = Joi.object({
    title: Joi.string().max(255).presence(required),
    director: Joi.string().max(255).presence(required),
    color: Joi.number().min(0).max(1).presence(required),
    year: Joi.string().max(255).presence(required),
    duration: Joi.number().presence(required),
    id: Joi.number().optional(), // pour react-admin
  }).validate(movie, { abortEarly: false }).error;
  // si l'objet errors n'est pas vide
  if (errors) {
    // renvoie l'erreur à l'utilisateur
    next(new ErrorHandler(422, errors.message));
  } else {
    // continue sur le prochain middleware
    next();
  }
};

// ce middleware renvoie une erreur si le titre est pris
// sinon il continue
const movieTitleIsFree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // récupère le titre de la requête
  const { title } = req.body as IMovie;
  // vérifie dans la base qu'un film avec ce titre n'existe pas
  const movie = await getMovieByTitle(title);
  // console.log(movie); // pour tester que getMovieByTitle fonctionne
  // pour tester, essayer avec un film dans la base : Pulp Fiction
  if (movie) {
    // il y a un film existant avec ce titre => erreur
    next(new ErrorHandler(409, 'That movie already exists'));
  } else {
    next();
  }
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  // on met toutes les infos du film dans la variable movie
  const movie = req.body as IMovie;
  // on va récupèrer l'id créé
  const idMovieCreated = await createMovie(movie);
  // console.log(idMovieCreated);
  // si j'ai bien reçu un id neuf
  if (idMovieCreated) {
    res.status(201).send({ ...movie, id: idMovieCreated });
  } else {
    next(new ErrorHandler(500, 'Oops'));
  }
};

export default { validateMovie, movieTitleIsFree, addMovie };
