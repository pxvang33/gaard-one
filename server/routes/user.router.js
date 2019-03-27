const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO person (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


///////////////////////////////////////////////////////////
///////        Gaard One stuff starts here      ///////////
///////////////////////////////////////////////////////////

// Get all users with employee or admin permissions
router.get('/employee', rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "person"
                     WHERE "admin" = true
                     OR "employee" = true;`;
  pool.query(queryText)
  .then((result) => { res.send(result.rows); })
  .catch((error) => { 
    console.log('Something went wrong in GET employees', error);
    res.sendStatus(500);
   });
});

//sets a user in req.body to admin
router.put('/setAdmin', rejectUnauthenticated, (req, res) => {
  if(req.user.admin){
    const queryText = `UPDATE "person" 
                       SET "admin" = true 
                       WHERE "id" =$1;`;
    pool.query(queryText, [req.body.id])
    .then((result) => { res.sendStatus(200); })
    .catch((error) => { 
      console.log('Something went wrong in put setAdmin rights', error);
      res.sendStatus(500);
    });
  }else{
    res.sendStatus(403);
  }
});

//removes admin rights from a user
router.put('/removeAdmin', rejectUnauthenticated, (req, res) => {
  if(req.user.admin){
    const queryText = `UPDATE "person" 
                       SET "admin" = false 
                       WHERE "id" =$1;`;
    pool.query(queryText, [req.body.id])
    .then((result) => { res.sendStatus(200); })
    .catch((error) => { 
      console.log('Something went wrong in put removeAdmin rights', error);
      res.sendStatus(500);
    });
  }else{
    res.sendStatus(403);
  }
});

//removes employee rights from a user
router.put('/removeEmployee', rejectUnauthenticated, (req, res) => {
  if(req.user.admin){
    const queryText = `UPDATE "person" 
                       SET "admin" = false,
                           "employee" = false
                       WHERE "id" =$1;`;
    pool.query(queryText, [req.body.id])
    .then((result) => { res.sendStatus(200); })
    .catch((error) => { 
      console.log('Something went wrong in put removeEmployee rights', error);
      res.sendStatus(500);
    });
  }else{
    res.sendStatus(403);
  }
});

//sets employee to true for user
router.put('/addEmployee', rejectUnauthenticated, (req, res) => {
  console.log('sent body', req.body);
  if(req.user.admin){
    const queryText = `UPDATE "person" 
                       SET "employee" = true
                       WHERE "username" =$1;`;
    pool.query(queryText, [req.body.name])
    .then((result) => { res.sendStatus(200); })
    .catch((error) => { 
      console.log('Something went wrong in put addEmployee rights', error);
      res.sendStatus(500);
    });
  }else{
    res.sendStatus(403);
  }
});

module.exports = router;
