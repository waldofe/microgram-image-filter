import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import { config } from './config';

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization){
    return res.status(401).send({ message: 'No authorization headers.' });
  }

  const token_bearer = req.headers.authorization.split(' ');
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = token_bearer[1];

  return jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage", requireAuth, async ( req, res ) => {
    const imageUrl = req.query.image_url;

    filterImageFromURL(imageUrl).then((processedImage) => {
      res.sendFile(processedImage, function(err) {
        if (!err) {
          deleteLocalFiles([processedImage])
        } else {
          // Add sentry
          console.log(err)
        }
      });
    }).catch(err => {
      // Add sentry
      res.status(422).send(`Image could not be processed: ${err}`)
    });
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
