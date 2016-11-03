serverless-react-boilerplate
============================

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/99xt/serverless-react-boilerplate](https://badges.gitter.im/99xt/serverless-react-boilerplate.svg)](https://gitter.im/99xt/serverless-react-boilerplate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Requirements
* Java Runtime Engine (JRE) version 6.x or newer to run dynamodb locally.

## Features
* Support serverless v1.0
* Support offline development with dynamodb, lambda and API Gateway
* Support local dynamodb seeds/migrations
* Build automation in client and server to ease local development
* Deploy to multiple APIGateways
* Environment variables with dotenv 
* Lambda CRUD operations for a Todo application with live reload
* React web application to utilize the API

## Demo
A todo app built with serverless. [View Demo Site](http://sls-react-auth.s3-website-us-east-1.amazonaws.com/)

## How to develop and test offline?
We have used [serverless-offline plugin](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local) in this boilerplate. You can declare your table templates and seeds in `offline/migrations` folder just like the `todo.json` template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions. Once you are ready to deploy your database and api in AWS use `npm run deploy`.

Note by Jeremy Cummins: testing offline will not work with authentication.

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
|  |  |  |──handler.js
|  |──database
|  |  |──dynamodb.js
|  |──offline
|  |  |──migrations
|  |  |  |  |──todo.json
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
* Clone https://github.com/jcummins54/serverless-authentication-boilerplate and follow README instructions for installation.
* Clone this repo.
* Make sure AWS credentials are setup properly. Otherwise refer [this document](https://github.com/serverless/serverless/blob/master/docs/02-providers/aws/01-setup.md)
* Install webpack and serverless globally.
```
 npm i -g webpack webpack-dev-server
 
 npm i -g serverless@1.0
 ```
* Install project dependencies. `cd serverless-react-boilerplate` and type,
```
  npm install 
```
* Install dynamodb local. (Make sure you have Java runtime 6.x or newer)
```
  npm run db-setup
```
* Run the client and server locally
```
 gulp serve
```
* Visit `http://localhost:8080`

## Deploying to AWS
When you are ready to deploy your database and api to AWS, you can create multiple 
APIGateways for different service level stages. For example you can create "dev" and "production" stages.
When you deploy to a specific stage, it will create separate database tables for that stage.

In **serverless/serverless.yml** replace **AWS-ACCOUNT-ID** in the custom authorizer arn. 
The arn should match the serverless-authentication-boilerplate arn for the stage you will be deploying.

Following command will deploy your local dabase and local API Gateway to AWS in dev service stage.
```
gulp deploy --stage dev
```
Once you have tested it on dev stage you can do a final production stage release by,
```
gulp deploy --stage prod
```

Replace the **API-ID** in the **BASE_URL** key in **web/webpack.config.js**. Make sure the region (i.e. 'us-east-1') and stage match your deployment.
Get the authentication endpoint ID from serverless-authentication-boilerplate and replace the **AUTH-ENDPOINT-ID** in the **AUTH_URL** key in **web/webpack.config.js**. Match the region and stage here as well.

## Environment Variables 
You can define environment variables for you application in the **custom** section. e.g. the DB table name is currently defined here as ITEMS_DB_NAME.

```
custom
  writeEnvVars:
    ITEMS_DB_NAME: ${self:custom.stage}-items
```
Once you have deployed the functions in AWS these environment variables will be available in the process.env object.
```
process.env.ITEMS_DB_NAME
```

## Contribution
Your contributions are much appriciated. 

## Release Log
* Release v3.0.0 - Added environment variables for database table names &  Feature to deploy in multiple APIGateway service level stages.
* Release v2.2.0 - Added foundation css framework for the react client
* Release v2.1.1 - Improvements in react web app
* Release v2.0.1 - Dynamodb local table creation bug fix
* Release v2.0.0 - Added support for serverless v1.0 and Issues #24 #25
* Release v1.0.3 - Fixed local dynamobd get packaged for deployment
* Release v1.0.2 - Added support for serverless@1.0.0-rc.2

## Links
* [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local)
* [serverless-offline plugin](https://github.com/dherault/serverless-offline)


## License
  [MIT](LICENSE)
