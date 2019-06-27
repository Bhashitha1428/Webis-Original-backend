const express = require('express');
const app=express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:123@cluster0-jenls.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


 ////////////////////////////
 app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS'){ 
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
      return res.status(200).json({});
  }
  next();
});
/////////////////////////


//connect to database
// mongoose.connect(config.database);


//on connection
// mongoose.connection.on('connected', () => { 
//   console.log('connected to database '+config.database)
// });

//on error
mongoose.connection.on('error', (err) => { 
    console.log('database error '+err)
  });






//port num
const port = 3000;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



//index route
app.get('/', (req,res) =>{
    res.send('invalid Endpoint');
});

//start server
app.listen(port, () =>{
   console.log('server started on port '+port);
});


const usersRoutes = require('./routes/users');
const courseRoutes = require('./routes/course');

app.use('/users',usersRoutes);
app.use('/course',courseRoutes);