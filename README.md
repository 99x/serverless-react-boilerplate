serverless-react-boilerplate
============================

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://www.npmjs.com/package/serverless-dynamodb-local)
[![Join the chat at https://gitter.im/99xt/serverless-react-boilerplate](https://badges.gitter.im/99xt/serverless-react-boilerplate.svg)](https://gitter.im/99xt/serverless-react-boilerplate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## This Plugin Requires
* Serverless serverless@v1-rc.1

## Features
* Support offline development with dynamodb, lambda and API Gateway
* Support local dynamodb seeds/migrations
* Build automation in client and server to ease local development
* Rich request template
* Lambda CRUD operations for a Todo application
* React web application to utilize the API

## Usage & Dependencies.
* Clone this repo
* Install webpack and serverless globally.
 ```
 npm i -g webpack
 
 npm i -g serverless@1.0.0-rc.1
 ```
* Run `npm install` inside the root folder, serverless folder and web folder.

## Starting server and client.

* Run `npm run app` from the root folder.
* Visit `http://localhost:8080`

## Deploying to AWS

* Run `npm run deploy`


## Links
* [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local)
* [serverless-offline plugin](https://github.com/dherault/serverless-offline)


## License
  [MIT](LICENSE)
