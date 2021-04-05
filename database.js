const pg        = require('pg');
const express   = require('express');
const app       = express();
const bodyParser = require('body-parser');


const config = {
    user: 'postgres',
    database: 'node_hero',
    password: '',
    port: 5432                  //Default port, change it if needed
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT $1::varchar AS my_first_balls',["balls"], function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

app.get('/users', function (req, res, next) {
  console.log(req)
  console.log(req.body)
  const user = req.query
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Can not connect to the DB" + err);
        return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {  
         done();
         if (err) {
             console.log(err);
             res.status(400).send(err);
         }
         res.status(200).send(result.rows);
    })
  })
})

app.get('/qusers', function (req, res, next) {
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Can not connect to the DB" + err);
        return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) { 
         done();
         if (err) {
             console.log(err);
             res.status(400).send(err);
         }
         res.status(200).send(result.rows);
    })
  })
})

app.listen(4000, function () {
    console.log('Server is running on port 4000');
});