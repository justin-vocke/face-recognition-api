const express= require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app= express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

const database = {
  users: [
    {
      id: '123',
      name: "justin",
      email: "Justin@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: "Rachel",
      email: "rachel@gmail.com",
      password: "123",
      entries: 0,
      joined: new Date()
    }
  ]
}

//register new user
app.post('/register', (req , res) =>{
  const {email , name , password} = req.body;

  database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

//get all users
app.get('/', (req , res) => {
  res.send(database.users);
})

app.post('/signin', (req , res) =>{

  bcrypt.compare("bacon", "$2a$10$L9A7vfgvtwHVusVI3/pLSOjkD2U8tfDCCUutQXfXnQOqV/CFIPgre", function(err, res) {
      console.log("first", res);
  });
  bcrypt.compare("veggies", "$2a$10$L9A7vfgvtwHVusVI3/pLSOjkD2U8tfDCCUutQXfXnQOqV/CFIPgre", function(err, res) {
      console.log("second", res);
  });


  if( req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password){
        res.json(database.users[0]);
  }
  else{
    res.status(400).json('error logging in');
    console.log('incorrect combo');
  }
})


app.get('/profile/:id' , (req , res) =>{
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if(!found){
      res.status(404).json('No such user');
  }
})

app.put('/image' , (req , res) =>{
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if(!found){
      res.status(404).json('No such user');
  }
})


// Load hash from your password DB.
