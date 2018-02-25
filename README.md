serverless-react-boilerplate
============================

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/npm/l/serverless-dynamodb-local.svg)](https://opensource.org/licenses/MIT)
[![Join the chat at https://gitter.im/99xt/serverless-react-boilerplate](https://badges.gitter.im/99xt/serverless-react-boilerplate.svg)](https://gitter.im/99xt/serverless-react-boilerplate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Sample Todo App
<img width="964" alt="screen shot 2017-08-29 at 4 49 58 am" src="https://user-images.githubusercontent.com/2338919/29805880-e14eb17c-8ca9-11e7-9b3d-a171238e880c.png">

## Requirements
* Java Runtime Engine (JRE) version 6.x or newer to run dynamodb locally.

## Features
* Support serverless v1.26.0
* Support offline development with dynamodb, lambda and API Gateway
* Support local dynamodb seeds/migrations
* Build automation in client and server to ease local development
* Deploy to multiple API Services 
* Use of Environment variables 
* Lambda CRUD operations for a Todo application with live reload
* React web application to utilize the API


## How to develop and test offline?
We have used [serverless-offline plugin](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local plugin](https://github.com/99xt/serverless-dynamodb-local) in this boilerplate. You can declare your table templates and seeds in `api/todo/offline/migrations/` folder just like the `todo.json` template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions.

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

### Directory structure
```
|──api
|  |──todo
|  |  |──lib
|  |  |  |──todo.js
|  |  |  |──helper.js
|  |  |  |──response.js
|  |  |──handler.js
|  |  |──database
|  |  |──dynamodb.js
|  |  |──offline
|  |  |  |──migrations
|  |  |  |  |──todo.yml
|  |  |  |  |──todo-seed.json
|  |  |──config.yml
|  |  |──serverless.yml
|  |  |──package.json
|──web
|  |──src
|  |  |──components
|  |  |──index.js
|  |──public
|  |  |──index.html
|  |──package.json
|──gulpfile.js
|──package.json


```
## Installation & Usage
* Clone this repo.
* Make sure AWS credentials are setup properly. Otherwise refer [this document](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
```
  aws configure --profile peter
```
* Add the aws cli profile name and region on to serverless.yml file located at **/api/todo/serverless.yml**
```
  ...
  provider:
  name: aws
  runtime: nodejs6.10
  profile: peter
  stage: dev
  region: eu-west-2
  ...
```

* Install serverless globally
```
 npm i -g serverless
 ```
* Install project dependencies. `cd serverless-react-boilerplate` and type,
```
  npm install 
```
* Install dynamodb local. (Make sure you have Java runtime 6.x or newer)
```
  npm run db-setup
```
* Run the app with the local server
```
  npm run app
```
* Browser will open the todo app at `http://localhost:3001`

## Deploying to AWS
When you are ready to deploy your database and api to AWS, you can create multiple 
APIGateways for different service level stages. For example you can create "dev" and "production" stages.
When you deploy to a specific stage, it will create a separate database tables for that stage.

Following command will deploy your lambda functions and APIGateway onto 'prod' stage.
```
cd api
cd todo
serverless deploy --stage prod
```

If you want to test your React app with the online API and Database, you may have to change the, **BASE_URL** of the react app
found in **web/src/App.js**. Change its value from **http://localhost:3000** to your **APIGateway uri**.

## Application Secrets Keys
You can define application secret keys in **config.yml** file. For example if you need to have a database 
connection string and use it in your lambda function, define it as follows.

```
prod:
  DB_STRING: <my-db-connection-string>
```

Then in the serverless.yml file, 
```
custom:
  DB_STRING: ${file(./config.yml):${self:custom.stage}.DB_STRING}
```
This will corretly select the DB_STRING corresponding to the defined stage.

You should **NOT** commit config.yml to your version control system 

## Deploying react web app
Once you have setup a S3 bucket with static web hosting enabled you can simply build your react app and deploy to that bucket.
Make sure to change **BASE_URL** to refer your production APIGateway endpoint.

On the root level package.json file add that bucket name and your AWS profile name on the **deploy-s3** task. After that run the following command.
```
  npm run deploy-s3
```

See following vidoes for a step by step guide to create a s3 bucket and configure static web hosting.
#### [Video 01 - Hosting a website on AWS with S3, CloudFront and Route53 ](https://youtu.be/D6qB7MEFOe0)
#### [Video 02 - Hosting Angular, React and Vue.js applications on AWS](https://youtu.be/f20XOaQ3JDA)

## Contribution
Your contributions are much appriciated. 

## Release Log
* Release v4.1.0 - Updated boilerplate to support Lambda Proxy
* Release v4.0.0 - Added support for serverless@1.x 
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
