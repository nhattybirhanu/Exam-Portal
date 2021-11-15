const express = require('express');
const {getProf} = require('../controllers/proffesiorcontroller');
const router = express.Router();
 router.get('/',getProf);

 module.exports=router;