const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouters = require('./routers/userRouters');
//require('dotenv').config();
var url="mongodb+srv://nhatty:10938562@cluster0.vmevq.mongodb.net/examportal?retryWrites=true&w=majority"
const app = express();

app.set('strict routing', true);
app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
   .connect(url)
   .then(() => {
<<<<<<< HEAD
      const app = express();

      // Middleware
      app.set('strict routing', true);
      app.set('case sensitive routing', true);
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      // Routes
      app.use('/users', userRouters);
      // Bootstrap
      app.listen(3000);
=======
>>>>>>> f14ad90faadadcdc80995a94c46d5b6f546ca9ee
   })
   .catch(err => console.log(err));


app.use('/',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization" );
      next();
})

  app.use('/users', userRouters);

   app.listen(3000,()=>{console.log("listening 3000")});
