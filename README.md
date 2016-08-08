# serverless-boilerplate
This is a boilerplate for serverless framework with architectural best practices

# Installation
- setup aws credentials in .aws directory
- cd backend && npm install
- serverless deploy

# Test Backend
You can send POST requests with following queries & mutations,
```
{
    "query": "query getAllUsers { users{email username id}}"
}

{
    "query": "mutation signUp { user: signUp(email:\"test@test.com\", username: \"test\", password: \"test1234\"){id username email}}"
}

{
    "query": "mutation signIn { user: signIn(email:\"rumeshh@99x.com\", password: \"rumesh\"){id username email jwt gravatar}}"
}
```

# Test Angular Client
- cd client-angular
- npm start
