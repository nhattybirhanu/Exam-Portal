const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouters = require('./routers/userRouters');
require('dotenv').config();

mongoose
   .connect(process.env.DB_URI)
   .then(() => {
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
   })
   .catch(err => console.log(err));
