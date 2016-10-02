# AWS Serverless Boilerplates
This boilerplate contains,
  - AWS Lambda Functions
  - AWS API Gateway
  - Request Mapping Templates
  - Dynamodb table templates
  - IAM Roles Definition
  - AWS Custom Authorizer Authentication
  - CRUD for sample TODO application
  - Angular client that utilizes the API.

## Prerequisite
  - Install serverless rc1
  ``` npm install serverless -g ```
  - Make sure you have setup aws credentials with your aws account. if not follow the guide here.       http://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html

## Deploy resources, functions and endpoints
```
    cd api
    serverless deploy
```

## Starting the client
```
    cd client
    npm Install
    node client.js
```
Visit ```localhost:3000```
