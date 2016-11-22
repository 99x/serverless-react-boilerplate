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
* API authentication per individual user

## Demo
A todo app built with serverless. [View Demo Site](http://sls-react-auth.s3-website-us-east-1.amazonaws.com/)

## How to develop and test offline?
We have used [serverless-offline plugin](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local) in this boilerplate. You can declare your table templates and seeds in `offline/migrations` folder just like the `todo.json` template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions. Once you are ready to deploy your database and api in AWS use `npm run deploy`.

Note by Jeremy Cummins: testing offline will not work with authentication. The instructions given here run the React client locally, connecting to a `local` stage on AWS.

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
|  |──example-env.yml
|  |──package.json
|  |──serverless.yml
|  |──templates.yml
|──web
|  |──src
|  |  |──components
|  |  |──index.js
|  |──index.html
|  |──package.json
|  |──webpack.dev.config.js
|  |──webpack.local.config.js
|──gulpfile.js
|──package.json


```
## Installation & Usage
* Clone or download the repository https://github.com/jcummins54/serverless-authentication-boilerplate/
* Switch to the branch `git checkout -b react-authenticate`, get the latest `git pull origin react-authenticate` and follow README instructions for installation.
* Clone this repo and switch to this branch `react-authenticate`.
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

## Setting up environment variables
In the `serverless` folder, copy `example-env.yml` to `env.dev.yml` and `env.local.yml` and configure them for each environment.
You will make a new one for each environment you need with the convention `env.[stage].yml`.

## Deploying to AWS
When you are ready to deploy your database and api to AWS, you can create multiple 
APIGateways for different service level stages. For example you can create "local", "dev" and "prod" stages.
Then deploy using the stage parameter:
```
gulp deploy --stage local
```
This command will deploy the API Gateway to AWS in the "local" service stage. This will:
* Copy serverless/env.local.yml to serverless/env.yml
* Deploy the local stage serverless Lambda app and associated API to AWS
* Copy web/webpack.local.config.js to web/webpack.config.js
* Run the local React webserver and open a browser

You can configure a deployment stage to sync to an s3 bucket or ftp to a server, however you want to set up hosting. See the `deploy-web` gulp task.
To sync to an s3 bucket, change the `sync-web-s3` to point to your s3 bucket.
```
gulp deploy --stage dev
```
This command will deploy the API Gateway to AWS in the "dev" service stage. This will:
* Copy serverless/env.dev.yml to serverless/env.yml
* Deploy the dev stage serverless Lambda app and associated API to AWS
* Copy web/webpack.dev.config.js to web/webpack.config.js
* Build the React app to web/bundle.js
* Sync the web folder to your s3 bucket

Once you have tested it on dev stage you can do a final production stage release by configuring serverless/env.prod.yml and web/webpack.prod.config.js, 
then modify the `deploy-web` gulp task to do what it needs to do to push the front end files to your production hosting solution.
```
gulp deploy --stage prod
```

## Contribution
Your contributions are much appreciated. 

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
