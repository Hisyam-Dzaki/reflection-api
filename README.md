<h1 align="center"> Final Projects : Reflections API </h1>


## Requirements
* Membuat Rest API dengan menggunakan NodeJS, ExpressJS dengan database Postgre dan juga implementasi auth dengan JWT.
* Dapat menggunakan Query SQL untuk menyimpan, memodifikasi dan mendapatkan data menggunakan database Postgre
* Setiap User hanya dapat melakukan CRUD terhadap data reflection miliknya sendiri

## Rest APIs
* User registration - POST /api/v1/users/register
* User Login - POST /api/v1/users/login
* Create reflection - POST /api/v1/reflections
* Get all Reflection - GET /api/v1/reflections
* Edit reflection - PUT /api/v1/reflections/:id
* Delete reflection - DELETE /api/v1/reflections/:id

## How to Run
1. Clone this project by typing this command below in your Terminal
```sh
git clone git@github.com:dewabagas/reflection-api.git
```
2. cd to this project
3. install dependencies by executing this command
```sh
npm install
```

## HEROKU Url
```sh
https://hacktiv8-reflection-api.herokuapp.com/
```

## Credits
* Bagas Dewanggono, INJS-KS02-007, Computer Science, UPI.
* Hisyam Dzaki Suatma, INJS-KS02-006, Informatics Engineering.