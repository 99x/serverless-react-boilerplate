serverless-react-boilerplate
============================

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/99xt/serverless-react-boilerplate](https://badges.gitter.im/99xt/serverless-react-boilerplate.svg)](https://gitter.im/99xt/serverless-react-boilerplate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements
* serverless@v1-rc.1
* Java Runtime Engine (JRE) version 6.x or newer to run Dynamodb Local

## Features
* Support offline development with dynamodb, lambda and API Gateway
* Support local dynamodb seeds/migrations
* Build automation in client and server to ease local development
* Rich request template
* Lambda CRUD operations for a Todo application
* React web application to utilize the API

## How to develop and test offline?
We have used [serverless-offline plugin](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local) in this boilerplate. You can declare your table templates and seeds in `offline/migrations` folder just like the `todo.json` template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions. 

## Production vs Offline
Thanks to the offline plugin's environment variable `IS_OFFLINE` we can select between local dynamodb and aws dynamodb. 
```
var dynamodbOfflineOptions = {
        region: "localhost",
        endpoint: "http://localhost:8000"
    },
    isOffline = () => process.env.IS_OFFLINE;

var client = isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) :  new AWS.DynamoDB.DocumentClient();
```

###Directory structure
```
|──serverless
|  |──handlers
|  |  |──todo
|  |  |  |──lib
|  |  |  |  |──todo.js
|  |  |  |  |──helper.js
|  |  |  |──config.yml
|  |  |  |──handler.js
|  |──database
|  |  |──dynamodb.js
|  |──offline
|  |  |──migrations
|  |──resources
|  |──test
|  |──event.json
|  |──templates.yml
|  |──serverless.yml
|  |──package.json
|──web
|  |──src
|  |  |──components
|  |  |──index.js
|  |──index.html
|  |──package.json
|  |──webpack.config.js
|──gulpfile.js
|──package.json


```
## Installation & Usage
* Clone this repo.
* Make sure AWS credentials are setup properly. Otherwise refer [this document](https://github.com/serverless/serverless/blob/master/docs/02-providers/aws/01-setup.md)
* Install webpack and serverless globally.
 ```
 npm i -g webpack webpack-dev-server
 
 npm i -g serverless@1.0.0-rc.1
 ```
* Install project dependencies. `cd serverless-react-boilerplate` and type,
```
 npm install 
```
* Install dynamodb local. (Make sure you have Java runtime 6.x or newer)
```
 npm run db-setup
```
* Run the client and server
```
 npm run app
```
* Visit `http://localhost:8080`

## Deploying to AWS

* Run `npm run deploy`


## Links
* [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local)
* [serverless-offline plugin](https://github.com/dherault/serverless-offline)


## License
  [MIT](LICENSE)
