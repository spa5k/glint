# Guide

# 1. Installation

```
pnpm install
```
or 

```
npm install
```
or

```
yarn
```

# 2. Setup the database

```
docker-compose up
```

# 3. Seed the database

## 3.1 Do the migrations
Install [DbMate](https://github.com/amacneil/dbmate)

and then do 
```
dbmate up
```
or

Run the SQL scripts in DB folder one by one.


## 3.2 Seed the Database

```
pnpm seed
```

# 4. Usage

## 4.1 Start the server -

```
pnpm dev
```

## 4.2 Check the API documentation -

Visit - http://localhost:3000/docs

# 5. How to test?

## 5.1 Start the server -

```
pnpm dev
```

## 5.2 Test the api -

```
pnpm test
```
