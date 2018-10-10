# express-seed-project

An ES6+ Express.js RESTful API starter project following best practices and Airbnb javascript style guide with JWT-based authentication, Socket.io real-time updates, multer and multer-s3 file upload to disk or DigitalOcean Spaces and nodemailer email notifications integration via MailGun.

## Technology:

- Node.js v10
- Express.js v4
- Socket.io v2
- MongoDB v4
- Docker

## Notes For Successfull Running

- You have to plug in a .env file of your own configuration (API Keys, Secret Keys and etc) in the root project folder.
- Mailer's API Key and Domain are based on Mailgun, so signup for a free account and add its credentials.
- Mailgun's free account sandbox domain have a limitation that you can only send emails to authorized recepients that you added, so add a couple of emails there for testing and for the functions to work.

## How to run manually?

1.  Clone the repo
2.  `npm i`
3.  - Development:
      1.  `npm start`
    - Production:
      1.  `npm i -g pm2`
      2.  `NODE_ENV=production pm2 start ./bin/www`

## How to run with docker?

1.  Clone the repo.
2.  - Development: `docker-compose -f docker-compose.dev.yml up`
    - Production:
      1.  `docker swarm init`
      2.  `docker stack deploy -c docker-compose.yml express-seed-project`

&#9400; Omar Doma 2018
