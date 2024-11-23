
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


## Module Used

```bash
Bcrypt - for encryption of password
JWT - for authenication and user authorisation
Mongoose - for connected mongodb with node
```