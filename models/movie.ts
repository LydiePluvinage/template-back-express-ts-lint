import { ResultSetHeader } from 'mysql2';
import connection from '../db-config';
import IMovie from '../interfaces/IMovie';

const getMovieByTitle = async (title: string) => {
  // QUAND la requête arrivera, mets le résultat dans results
  const results = await connection
    .promise()
    .query<IMovie[]>('SELECT * FROM movies WHERE title = ?', [title]);
  // je vais renvoyer le premier movie trouvé (vide si title n'existe pas)
  return results[0][0];
};

const createMovie = async (movie: IMovie) => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO movies (title, director, color, year, duration) VALUES(?, ?, ?, ?, ?)',
      [movie.title, movie.director, movie.color, movie.year, movie.duration]
    );
  // console.log(results);
  // renvoie l'id créé
  return results[0].insertId;
};

export { getMovieByTitle, createMovie };
