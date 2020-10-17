import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // TODO: Add authentication
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage", async ( req, res ) => {
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
      res.status(500).send(`Image could not be processed: ${err}`)
    });
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();