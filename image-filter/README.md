# Microgram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. Setup a `.env` file setting `JWT_SECRET`
3. run the development server with `npm run dev`

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

### Trying it out (temporarily deployed environment in Elastic Beanstalk)

Submit a `GET http://image-filter.sa-east-1.elasticbeanstalk.com/filteredimage?image_url=<url>` with the authentication header provided in
the `cloud-cdnd-c2-final.postman_collection.json`, or import this file using Postman (collections) and try sending requests there.

Requests without auth header to the endpoint above will fail.
