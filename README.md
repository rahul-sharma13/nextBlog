
## Blog Backend

The API is written in node js and express js with mongodb as database

## Client side repository
```bash
https://github.com/rahul-sharma13/nextBlog-client
```

## Sample env
Please add this to the api folder in .env file

```bash
MONGO_URL = mongodb+srv://rahulsmh1308:7u2NIbidoo7wUXuR@cluster0.jsv5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT = 8000

ACCESS_TOKEN_SECRET = adahfbkahsbfk
ACCESS_TOKEN_EXPIRY = 1d
```

## Getting started

Install with npm - commands required to start

```bash
repository clone - git clone https://github.com/rahul-sharma13/nextBlog.git
```

```bash
  cd api
  npm install
  npm run dev
```

## Use of JWT
![image](https://github.com/user-attachments/assets/f958fd84-0fef-47f8-ba25-c154100fe988)

```bash
src - contains all the folders related to backend

    db - consists of file used for db connection

    routes - consists of files defining different api routes

    controllers - consists controller functions related to the api routes defined

    middlewares - consists of middlewares used

    utils - for common function like apiresponse and apierror

    models - consists of files for defining database models

index.js - root file
```

## Module Used

```bash
Bcrypt - for encryption of password
JWT - for authenication and user authorisation
Mongoose - for connected mongodb with node
```