# serverless-boilerplate
This is a boilerplate for serverless framework with architectural best practices

# Installation
- setup aws credentials in .aws directory
- cd backend && npm install
- serverless deploy

# Test Query
Send a POST request with following query,
```
{
    "query": "query {users {email username id}}"
}
```
