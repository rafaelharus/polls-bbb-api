Polls BBB API Node/MongoDB Example
=================================================

This project is an example of REST API written in Node 12 that makes use of [Koa](https://koajs.com/) framework, [Awilix](https://github.com/jeffijoe/awilix) container and [MongoDB](https://mongodb.com/).

It basically has two endpoints that allow us to perform some CRUD operations:

- /v1/poll
- /v1/answer

The endpoints are protected by a basic authorization header in the following format `Authorization: Basic ....`.
You can use the following value for testing purposes only `Basic OTVlNjUwMzEwYWE0MDFiNTg1MmQ2M2U1OWFhM2EwY2M6NjA4NzQzMjM3ZTRmYWE4MTYzYzdhMzMxMjE4MDI5OTY=`. It is not recommended to have credentials exposed in your code!

Note: By default, the rate limit is 100 requests per second.

## DOCS
The endpoint's documentation is located in `/docs` folder. It was written on top of OpenAPI v3 notation.

## Running the project

**OBS: Node.JS and MongoDB are required**

1. Run `npm install`
2. Run `npm run dev`
3. Optionally run `NODE_ENV=development node command.js populate:db --drop` to seed the database.
4. Make calls to the endpoints via [Postman](https://www.getpostman.com/) or similar in the following address `0.0.0.0:3000/v1/answer`

**Using it with Docker**
1. `docker-compose up -d`
2. Optionally run `docker exec -it polls-bbb-node bash -c 'node command.js populate:db --drop'` to seed the database. 
3. Make calls to the endpoints via [Postman](https://www.getpostman.com/) or similar in the following address `0.0.0.0:8080/v1/answer`

## Running tests
1. Run `npm run test`

## Questions and Suggestions?
Drop me an [e-mail](mailto:rafael.harus@gmail.com)

## TODO
- Fetch credentials from database (cached) in order to keep it more easily to maintain
- Create more unit tests to have a 100% coverage score.
